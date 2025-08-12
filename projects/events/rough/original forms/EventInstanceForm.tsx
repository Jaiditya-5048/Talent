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
    venuesList,
    artistsList,
    addNewArtist,
    addNewVenue,
  } = useEventForm();

  const [isVenueModalOpen, setVenueModalOpen] = useState(false);
  const [isArtistModalOpen, setArtistModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      venue: currentInstance.venue || '',
      artists: currentInstance.artists || [],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setCurrentInstance((prev) => ({ ...prev, ...data }));
    console.log('Instance submitted:', data);
  };

  return (
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

      <Button type="submit">Save Instance</Button>

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
  );
};

export default EventInstanceForm;
