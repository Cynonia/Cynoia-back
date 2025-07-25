import { z } from 'zod';

const amenitiesEnum = z.enum(['wifi', 'projector', 'whiteboard', 'tv', 'coffee', 'air_conditioning', 'parking']);
const spaceTypeEnum = z.enum(['meeting_room', 'coworking', 'private_office', 'event_hall', 'workshop']);

const timeSlotSchema = z.object({
  start: z.string(),
  end: z.string()
});

const availabilitySchema = z.object({
  monday: timeSlotSchema.optional(),
  tuesday: timeSlotSchema.optional(),
  wednesday: timeSlotSchema.optional(),
  thursday: timeSlotSchema.optional(),
  friday: timeSlotSchema.optional(),
  saturday: timeSlotSchema.optional(),
  sunday: timeSlotSchema.optional()
});

export const createSpaceSchema = z.object({
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(500).optional(),
  type: spaceTypeEnum,
  capacity: z.number().int().min(1).max(500),
  location: z.object({
    building: z.string().trim().min(1),
    floor: z.string().trim().min(1),
    room: z.string().trim().min(1)
  }),
  amenities: z.array(amenitiesEnum).optional(),
  hourlyRate: z.number().min(0),
  images: z.array(z.string().url()).optional(),
  availability: availabilitySchema.optional(),
  isActive: z.boolean().optional()
});

export const updateSpaceSchema = createSpaceSchema.partial();
