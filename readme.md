# 🧮 @isluny/bitfields

## Creating a Bitfield Set
### 🟨 JavaScript

```ts
const { bitfields } = require('@isluny/bitfields')

const GroupPermissions = bitfields.create(
    // Flags
    {
        'create:post_content': bitfields.bit(0), // (1n << 0n) -> 0n
        'read:post_content': bitfields.bit(1), // (1n << 1n) -> 1n
        'update:members': bitfields.bit(2), // (1n << 2n) -> 2n
        'update:group': bitfields.bit(3), // (1n << 3n) -> 4n
    },
    // default bits
    [
        'create:post_content',
        'read:post_content'
    ]
)
```

### 🟦 TypeScript
```ts
import { bitfields } from '@isluny/bitfields'

const GroupPermissions = bitfields.create(
    // Flags
    {
        'create:post_content': bitfields.bit(0), // (1n << 0n) -> 0n
        'read:post_content': bitfields.bit(1), // (1n << 1n) -> 1n
        'update:members': bitfields.bit(2), // (1n << 2n) -> 2n
        'update:group': bitfields.bit(3), // (1n << 3n) -> 4n
    },
    // default bits
    [
        'create:post_content',
        'read:post_content'
    ]
)
type GroupPermissions = bitfields.infer<typeof GroupPermissions>
```

or

```ts
class GroupPermissions extends bitfields.Bitfield<typeof GroupPermissions['Flags']> {
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
```

## Using Bitfield
```ts
const permissions = new GroupPermissions()
```

## Methods

### `has(bit: Bit<Flags>): boolean`
Checks if a specific bit is set.

```ts
permissions.has('create:post_content') // true or false
```

### `add(...bits: Bit<Flags>): this`
Adds one or more bits to the bitfield.

```ts
permissions.add('update:members')
```

### `remove(...bits: Bit<Flags>): this`
Removes one or more bits from the bitfield.

```ts
permissions.remove('create:post_content')
```

### `serialize(): Record<Keys<Flags>, boolean>`
Returns an object representing the bitfield flags as key-value pairs.

```ts
console.log(permissions.serialize())
```

### `toArray(): Array<Keys<Flags>>`
Returns an array of all enabled flags.

```ts
console.log(permissions.toArray())
```

### `toJSON(): number`
Returns the numerical representation of the bitfield.

```ts
console.log(permissions.toJSON())
```

### Iterating Over Flags
You can iterate over a bitfield instance to get all active flags.

```ts
for (const flag of permissions) {
    console.log(flag)
}
```

## Conclusion
`@isluny/bitfields` provides an efficient and flexible way to manage permissions and feature flags using bitfields. Whether you're handling user roles, access permissions, or other flag-based systems, this package offers an intuitive API with TypeScript support. 🚀

