import { bitfields } from '../../src'

export class GroupPermissions extends bitfields.Bitfield<typeof GroupPermissions['Flags']> {
	static Flags = {
		'create:post_content': bitfields.bit(0), // (1n << 0n) -> 0n,
		'read:post_content': bitfields.bit(1), // (1n << 1n) -> 1n,
		'update:members': bitfields.bit(2), // (1n << 2n) -> 2n,
		'update:group': bitfields.bit(3), // (1n << 3n) -> 4n,
	}

	static defaultBits = GroupPermissions.resolve<typeof GroupPermissions['Flags']>(
		'create:post_content',
		'read:post_content'
	)
}