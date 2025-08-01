// services/eventInstance.service.js
import dayjs from 'dayjs';
import {
  findInstancesByEventId,
  findInstanceById,
  findInstancesByCity,
  createInstanceRepo,
  updateInstanceRepo,
  deleteInstanceRepo,
} from '../repositories/eventInstance.repository.js';
import { findEventById } from '../repositories/event.repository.js';
import { getVenueById } from '../repositories/venue.repository.js';
import AppError from '../utils/AppError.js';
import { countTicketsWithInstanceId } from '../repositories/ticket.repository.js';
import { createTicketType, deleteTicketTypesByInstanceId } from '../repositories/ticketType.repository.js';
import db from '../models/index.js';
import Messages from '../utils/responseMessages.js';
import { StatusCodes } from 'http-status-codes';
import { createEventInstanceArtist } from '../repositories/eventInstanceArtist.repository.js';
import { getArtistById } from '../repositories/artist.repository.js';

// funtion to format the response
// function formatInstance(instanceData) {
//   const { Artists, ...rest } = instanceData.toJSON ? instanceData.toJSON() : instanceData;

//   return {
//     ...rest,
//     artists: Artists?.map((a) => a.name) || [],
//   };
// }

// ways of using to format function
// export const getInstanceByIdService = async (id) => {
//   const instance = await findInstanceById(id);
//   return instance ? formatInstance(instance.toJSON()) : null;
// };

// export const getInstancesByEventIdService = async (eventId) => {
//   const instances = await findInstancesByEventId(eventId);
//   return instances.map((i) => formatInstance(i.toJSON()));
// };

//helper const for not found error
const NotFoundAppError = new AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND);


export const getInstancesByEventIdService = async (eventId) => {
  const instances = await findInstancesByEventId(eventId);
  return instances;
};

export const getInstanceByIdService = async (id) => {
  const instance = await findInstanceById(id);
  return instance;
};

export const getInstancesByCityService = async (city) => {
  const instances = await findInstancesByCity(city);
  return instances;
};


///////////////////////////// Organiser Event Instance Services /////////////////////////

export const createInstanceService = async (instanceData, organiser_id) => {
  // Check event
  const event = await findEventById(instanceData.event_id, organiser_id);
  if (!event) throw new AppError(NotFoundAppError);

  // Check venue
  const venue = await getVenueById(instanceData.venue_id);
  if (!venue) throw new AppError(NotFoundAppError);

  // Create instance
  const instance = await createInstanceRepo(instanceData);
  const instanceId = instance.instance_id;

  // Add artists to instance
  for (const artistId of instanceData.artist_ids) {
    console.log("artist check", instanceId, artistId);
    const artist = await getArtistById(artistId);
    console.log('artist', artist);
    if (!artist) {throw new AppError(NotFoundAppError)};    

    await createEventInstanceArtist({
      instance_id: instanceId,
      artist_id: artistId,
    });
  }

  // Add ticket types
  for (const ticket of instanceData.tickets) {
    await createTicketType({
      ...ticket,
      instance_id: instanceId,
    });
  }

  // Return full instance
  const fullInstance = await findInstanceById(instanceId);
  return fullInstance;
};


export const updateInstanceService = async (instance_id, data) => {
  const {venue_id , capacity} = data
  const instance = await findInstanceById(instance_id);
  if (!instance) {
    throw new AppError(NotFoundAppError);
  }  
  const updated = await updateInstanceRepo(instance_id, { venue_id, capacity });
   return updated;
};

export const deleteInstanceService = async (instance_id) => {
  const transaction = await db.sequelize.transaction();
  try {
    const instance = await findInstanceById(instance_id);
    if (!instance) {
      throw new AppError(NotFoundAppError);
    }
    console.log('instance_id', instance_id);

    const ticketCount = await countTicketsWithInstanceId(instance_id);
    console.log('ticketCount', ticketCount);
    
    if (ticketCount > 0) {
      throw new AppError(Messages.Event_instance.DELETE_ERROR_TCIEKTS_SOLD, StatusCodes.CONFLICT);
    }

    await deleteTicketTypesByInstanceId(instance_id, transaction);
    await deleteInstanceRepo(instance_id, transaction);

    await transaction.commit();
    return { message: Messages.Event_instance.DELETED };
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

