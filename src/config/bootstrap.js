import { IoCContainer } from '../lib/IoCContainer.js'

import { MQTTListener } from '../lib/MQTTListener.js'
import { MQTTRepository } from '../repositories/MQTTRepository.js'
import { MQTTService } from '../services/MQTTService.js'
import { SensorController } from '../controllers/SensorController.js'

const iocContainer = new IoCContainer()

// MQTT Modules
iocContainer.register('MQTTListener', new MQTTListener(), { singleton: true })
iocContainer.register('MQTTRepository', MQTTRepository, { dependencies: ['MQTTListener'], singleton: true })
iocContainer.register('MQTTService', MQTTService, { dependencies: ['MQTTRepository'], singleton: true, })
iocContainer.register('SensorController', SensorController, { dependencies: ['MQTTService'], singleton: true })

export const container = Object.freeze(iocContainer)