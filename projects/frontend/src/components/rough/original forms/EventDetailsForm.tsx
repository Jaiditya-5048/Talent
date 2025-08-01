// EventInstanceForm.tsx
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEventForm } from '@/context/EventFormContext';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import AddVenueModal from '@/components/modals/AddVenueModal';
import AddArtistModal from '@/components/modals/AddArtistModal';

const schema = yup.object().shape({
  venue: yup.string().required('Venue is required'),
  artists: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one artist is required'),
});

const EventInstanceForm = () => {
  const {
    currentInstance,
    setCurrentInstance,
    addInstance,
    venuesList,
    artistsList,
    addNewArtist,
    addNewVenue,
    formData,
    setCurrentInstance: resetInstance,
  } = useEventForm();

  const [isVenueModalOpen, setVenueModalOpen] = useState(false);
  const [isArtistModalOpen, setArtistModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      venue: '',
      artists: [],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    addInstance();
    reset();
  };

  const handleEdit = (index: number) => {
    const instance = formData.instances[index];
    setCurrentInstance(instance);
    setValue('venue', instance.venue);
    setValue('artists', instance.artists);
  };

  const handleDelete = (index: number) => {
    const updated = [...formData.instances];
    updated.splice(index, 1);
    setCurrentInstance((prev) => ({ ...prev, instances: updated }));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Venue Selector */}
        <div className="flex gap-2 items-center">
          <Controller
            name="venue"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Venue" />
                </SelectTrigger>
                <SelectContent>
                  {venuesList.map((venue) => (
                    <SelectItem key={venue.id} value={venue.id}>
                      {venue.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <Button type="button" onClick={() => setVenueModalOpen(true)}>
            + Add Venue
          </Button>
        </div>
        {errors.venue && (
          <p className="text-red-500 text-sm">{errors.venue.message}</p>
        )}

        {/* Artist Selector */}
        <div className="flex gap-2 items-center">
          <Controller
            name="artists"
            control={control}
            render={({ field }) => (
              <Select
                value={(field.value?.[0] as string) || ''}
                onValueChange={(val) => field.onChange([val])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Artist" />
                </SelectTrigger>
                <SelectContent>
                  {artistsList.map((artist) => (
                    <SelectItem key={artist.id} value={artist.id}>
                      {artist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <Button type="button" onClick={() => setArtistModalOpen(true)}>
            + Add Artist
          </Button>
        </div>
        {errors.artists && (
          <p className="text-red-500 text-sm">{errors.artists.message}</p>
        )}

        <Button type="submit">Add Instance</Button>

        {/* Venue Modal */}
        <AddVenueModal
          open={isVenueModalOpen}
          onOpenChange={setVenueModalOpen}
          onCreate={(venue) => {
            addNewVenue(venue);
            setValue('venue', venue.id);
            setVenueModalOpen(false);
          }}
        />

        {/* Artist Modal */}
        <AddArtistModal
          open={isArtistModalOpen}
          onOpenChange={setArtistModalOpen}
          onCreate={(artist) => {
            addNewArtist(artist);
            setValue('artists', [artist.id]);
            setArtistModalOpen(false);
          }}
        />
      </form>

      {/* Show Instances Below */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Event Instances</h3>
        {formData.instances.map((instance, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <div>
              <p className="text-sm">
                <strong>Venue:</strong> {instance.venue}
              </p>
              <p className="text-sm">
                <strong>Artists:</strong> {instance.artists.join(', ')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleEdit(index)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventInstanceForm;
