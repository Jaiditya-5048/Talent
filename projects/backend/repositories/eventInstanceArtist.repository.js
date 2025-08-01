import db from '../models/index.js';
const EventInstanceArtist = db.EventInstanceArtist;


export const createEventInstanceArtist = async (data) => EventInstanceArtist.create(data);

export const findEventInstanceArtistByArtistId = async (artistId) => {
  return EventInstanceArtist.findOne({
    where: { artist_id: artistId },
  });
}

export const deleteEventInstanceArtist = async (instanceId, artistId) =>
  EventInstanceArtist.destroy({
    where: {
      instance_id: instanceId,
      artist_id: artistId,
    },
  });
