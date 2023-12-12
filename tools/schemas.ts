import { z } from 'zod'

export const MongoId = z.string().regex(/[a-f0-9]{24}/i)

export const CreationDef = z.object({
    id: MongoId,
    base: z.string(),
    name: z.string().optional(),

    props: z.object({
        clonedFrom: MongoId.optional(),
        changerId: MongoId.optional(),
        emitsId: MongoId.optional(),
        motionId: MongoId.optional(),
        environmentId: MongoId.optional(),
        getId: MongoId.optional(),
        hasId: MongoId.optional(),
        holdableId: MongoId.optional(),
        wearableId: MongoId.optional(),
        thingRefs: MongoId.optional(),
    }).optional()
})
export type CreationDef = z.infer<typeof CreationDef>

export const Motions = z.object({ ids: MongoId.array().nullable(), midpoint: z.coerce.number().nullable() })
export const HolderContent = z.object({
    _id: MongoId,
    itemId: MongoId,
    flip: z.coerce.number(),
    rot: z.coerce.number(),
    x: z.coerce.number(),
    y: z.coerce.number(),
    z: z.coerce.number(),
    pageNo: z.coerce.number(),
})
export type HolderContent = z.infer<typeof HolderContent>
export const HolderContents = z.object({ isCreator: z.boolean(), contents: HolderContent.array() })
export const MultiContents = z.object({ isCreator: z.boolean(), data: z.object({
    _id: MongoId,
    multithingId: MongoId,
    itemProps: z.object({id: MongoId, state: z.coerce.number().optional() }).array(),
    // More but it's not relevant
}) })
