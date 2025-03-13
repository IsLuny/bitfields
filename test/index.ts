import { UserFeatures } from './bitfields/features'
import { GroupPermissions } from './bitfields/group-permissions'

const features = new UserFeatures('create:post_content', 'read:post_content')
const permissions = new GroupPermissions('create:post_content')

console.log(UserFeatures, features)