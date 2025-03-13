import { bitfields } from '../../src'

export const UserFeatures = bitfields.create({
	'create:post_content': 1n << 0n,
	'read:post_content': 1n << 1n,
})
export type UserFeatures = bitfields.infer<typeof UserFeatures>