import { IoCContainer } from '../lib/IoCContainer.js'
import { MQTTListener } from '../lib/MQTTListener.js'
import { MQTTRepository } from '../repositories/MQTTRepository.js'
import { MQTTService } from '../services/MQTTService.js'
import { MeasurementModel } from '../models/MeasurementModel.js'
import { MeasurementController } from '../controllers/MeasurementController.js'
import { MeasurementRepository } from '../repositories/MeasurementRepository.js'
import { MeasurementService } from '../services/MeasurmentService.js'

const iocContainer = new IoCContainer()

// MQTT Modules
iocContainer.register('MQTTListener', MQTTListener, { singleton: true })
iocContainer.register('MQTTRepository', MQTTRepository, { dependencies: ['MQTTListener'], singleton: true })
iocContainer.register('MQTTService', MQTTService, { dependencies: ['MQTTRepository'], singleton: true })

// Measurement Modules
iocContainer.register('MeasurementModel', MeasurementModel, { type: true })
iocContainer.register('MeasurementRepository', MeasurementRepository, { dependencies: ['MeasurementModel'], singleton: true })
iocContainer.register('MeasurementService', MeasurementService, { dependencies: ['MeasurementRepository', 'MQTTService'], singleton: true })
iocContainer.register('MeasurementController', MeasurementController, { dependencies: ['MeasurementService'], singleton: true })

export const container = Object.freeze(iocContainer)