import { IoCContainer } from '../lib/IoCContainer.js'

const iocContainer = new IoCContainer()

// // Profile Modules
// iocContainer.register('ProfileRepositorySingleton', ProfileRepository, { singleton: true })
// iocContainer.register('ProfileServiceSingleton', ProfileService, { dependencies: ['ProfileRepositorySingleton'], singleton: true, })
// iocContainer.register('ProfileController', ProfileController, { dependencies: ['ProfileServiceSingleton'], singleton: true })

// // Auth Modules
// iocContainer.register('AuthRepositorySingleton', AuthRepository, { singleton: true })
// iocContainer.register('AuthServiceSingleton', AuthService, { dependencies: ['AuthRepositorySingleton', 'JsonWebToken'], singleton: true, })
// iocContainer.register('AuthController', AuthController, { dependencies: ['AuthServiceSingleton'], singleton: true })

export const container = Object.freeze(iocContainer)