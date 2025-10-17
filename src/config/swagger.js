const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CareHarvestPackingDev API',
      version: '1.0.0',
      description: 'API documentation for CareHarvestPackingDev',
    },
    servers: [
      {
        url: 'http://192.168.14.25:3000/api/v1',
        description: 'Production server',
      },
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        // Objects
        AddObject: {
          type: 'object',
          properties: {
            object_name: {
              type: 'object',
              properties: {
                ru: { type: 'string' },
                tk: { type: 'string' },
              },
              required: ['ru', 'tk'],
            },
            object_number: { type: 'integer' },
            object_desc: { type: 'object' },
            object_contact: { type: 'object' },
          },
          required: ['object_name', 'object_number'],
        },
        UpdateObject: {
          type: 'object',
          properties: {
            object_guid: { type: 'string' },
            object_name: {
              type: 'object',
              properties: {
                ru: { type: 'string' },
                tk: { type: 'string' },
              },
              required: ['ru', 'tk'],
            },
            object_number: { type: 'integer' },
            object_desc: { type: 'object' },
            object_contact: { type: 'object' },
          },
          required: ['object_guid', 'object_name', 'object_number'],
        },
        DeleteObject: {
          type: 'object',
          properties: {
            object_guid: { type: 'string' },
          },
          required: ['object_guid'],
        },
        DeleteMultipleObjects: {
          type: 'object',
          properties: {
            object_guids: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of object GUIDs to delete'
            },
          },
          required: ['object_guids'],
        },
        Object: {
          type: 'object',
          properties: {
            object_guid: { type: 'string' },
            object_name: {
              type: 'object',
              properties: {
                ru: { type: 'string' },
                tk: { type: 'string' },
              },
            },
            object_number: { type: 'integer' },
            object_desc: { type: 'object' },
            object_contact: { type: 'object' },
          },
        },
        // Blocks
        AddBlock: {
          type: 'object',
          properties: {
            block_name: { type: 'string' },
            block_number: { type: 'integer' },
            block_desc: { type: 'object' },
            block_contact: { type: 'object' },
          },
          required: ['block_name', 'block_number'],
        },
        UpdateBlock: {
          type: 'object',
          properties: {
            block_guid: { type: 'string' },
            block_name: { type: 'string' },
            block_number: { type: 'integer' },
            block_desc: { type: 'object' },
            block_contact: { type: 'object' },
          },
          required: ['block_guid'],
        },
        DeleteBlock: {
          type: 'object',
          properties: {
            block_guid: { type: 'string' },
          },
          required: ['block_guid'],
        },
        DeleteBlocks: {
          type: 'object',
          properties: {
            block_guids: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of block GUIDs to delete'
            },
          },
          required: ['block_guids'],
        },
        Block: {
          type: 'object',
          properties: {
            block_guid: { type: 'string' },
            block_name: { type: 'string' },
            block_number: { type: 'integer' },
            block_desc: { type: 'object' },
            block_contact: { type: 'object' },
          },
        },

        // Sectors
        AddSector: {
          type: 'object',
          properties: {
            sector_name: { type: 'string' },
            sector_number: { type: 'integer' },
            sector_desc: { type: 'object' },
            sector_contact: { type: 'object' },
          },
          required: ['sector_name', 'sector_number'],
        },
        UpdateSector: {
          type: 'object',
          properties: {
            sector_guid: { type: 'string' },
            sector_name: { type: 'string' },
            sector_number: { type: 'integer' },
            sector_desc: { type: 'object' },
            sector_contact: { type: 'object' },
          },
          required: ['sector_guid'],
        },
        DeleteSector: {
          type: 'object',
          properties: {
            sector_guid: { type: 'string' },
          },
          required: ['sector_guid'],
        },
        Sector: {
          type: 'object',
          properties: {
            sector_guid: { type: 'string' },
            sector_name: { type: 'string' },
            sector_number: { type: 'integer' },
            sector_desc: { type: 'object' },
            sector_contact: { type: 'object' },
          },
        },

        // Valves
        AddValve: {
          type: 'object',
          properties: {
            sector_guid: { type: 'string' },
            valve_name: { type: 'object' },
            valve_desc: { type: 'object' },
            valve_params: { type: 'object' },
          },
          required: ['sector_guid', 'valve_name'],
        },
        UpdateValve: {
          type: 'object',
          properties: {
            valve_guid: { type: 'string' },
            valve_name: { type: 'object' },
            valve_desc: { type: 'object' },
            valve_params: { type: 'object' },
          },
          required: ['valve_guid'],
        },
        DeleteValve: {
          type: 'object',
          properties: {
            valve_guid: { type: 'string' },
          },
          required: ['valve_guid'],
        },
        DeleteValves: {
          type: 'object',
          properties: {
            valve_guids: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of valve GUIDs to delete'
            },
          },
          required: ['valve_guids'],
        },
        Valve: {
          type: 'object',
          properties: {
            valve_guid: { type: 'string' },
            sector_guid: { type: 'string' },
            valve_name: { type: 'object' },
            valve_desc: { type: 'object' },
            valve_params: { type: 'object' },
            modified_dt: { type: 'string', format: 'date-time' },
          },
        },

        // Archs
        AddArch: {
          type: 'object',
          properties: {
            arch_name: { type: 'string' },
            arch_number: { type: 'integer' },
            arch_desc: { type: 'object' },
            arch_contact: { type: 'object' },
          },
          required: ['arch_name', 'arch_number'],
        },
        UpdateArch: {
          type: 'object',
          properties: {
            arch_guid: { type: 'string' },
            arch_name: { type: 'string' },
            arch_number: { type: 'integer' },
            arch_desc: { type: 'object' },
            arch_contact: { type: 'object' },
          },
          required: ['arch_guid'],
        },
        DeleteArch: {
          type: 'object',
          properties: {
            arch_guid: { type: 'string' },
          },
          required: ['arch_guid'],
        },
        Arch: {
          type: 'object',
          properties: {
            arch_guid: { type: 'string' },
            arch_name: { type: 'string' },
            arch_number: { type: 'integer' },
            arch_desc: { type: 'object' },
            arch_contact: { type: 'object' },
          },
        },

        // Tracks
        AddTrack: {
          type: 'object',
          properties: {
            arch_guid: { type: 'string', description: 'Reference to the parent arch' },
            track_name: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Track name in Russian' },
                tk: { type: 'string', description: 'Track name in Turkmen' },
              },
              required: ['ru', 'tk'],
            },
            track_number: { type: 'integer', description: 'Track number' },
            track_desc: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Track description in Russian' },
                tk: { type: 'string', description: 'Track description in Turkmen' },
              },
            },
            track_params: { type: 'object', description: 'Additional parameters for the track' },
          },
          required: ['arch_guid', 'track_name', 'track_number'],
        },
        UpdateTrack: {
          type: 'object',
          properties: {
            track_guid: { type: 'string', description: 'Unique identifier for the track' },
            track_name: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Track name in Russian' },
                tk: { type: 'string', description: 'Track name in Turkmen' },
              },
              required: ['ru', 'tk'],
            },
            track_number: { type: 'integer', description: 'Track number' },
            track_desc: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Track description in Russian' },
                tk: { type: 'string', description: 'Track description in Turkmen' },
              },
            },
            track_params: { type: 'object', description: 'Additional parameters for the track' },
          },
          required: ['track_guid', 'track_name', 'track_number'],
        },
        DeleteTrack: {
          type: 'object',
          properties: {
            track_guid: { type: 'string', description: 'Unique identifier for the track' },
          },
          required: ['track_guid'],
        },
        DeleteTracks: {
          type: 'object',
          properties: {
            track_guids: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of track GUIDs to delete'
            },
          },
          required: ['track_guids'],
        },
        Track: {
          type: 'object',
          properties: {
            track_guid: { type: 'string', description: 'Unique identifier for the track' },
            arch_guid: { type: 'string', description: 'Reference to the parent arch' },
            track_name: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Track name in Russian' },
                tk: { type: 'string', description: 'Track name in Turkmen' },
              },
              required: ['ru', 'tk'],
            },
            track_number: { type: 'integer', description: 'Track number' },
            track_desc: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Track description in Russian' },
                tk: { type: 'string', description: 'Track description in Turkmen' },
              },
            },
            track_params: { type: 'object', description: 'Additional parameters for the track' },
            modified_dt: { type: 'string', format: 'date-time', description: 'Last modification date' },
          },
        },

        // Harvest Details
        AddHarvestDetail: {
          type: 'object',
          properties: {
            harvest_name: { type: 'string' },
            harvest_date: { type: 'string', format: 'date' },
            harvest_quantity: { type: 'number' },
          },
          required: ['harvest_name', 'harvest_date', 'harvest_quantity'],
        },
        UpdateHarvestDetail: {
          type: 'object',
          properties: {
            harvest_id: { type: 'string' },
            harvest_name: { type: 'string' },
            harvest_date: { type: 'string', format: 'date' },
            harvest_quantity: { type: 'number' },
          },
          required: ['harvest_id', 'harvest_name', 'harvest_date', 'harvest_quantity'],
        },
        DeleteHarvestDetail: {
          type: 'object',
          properties: {
            harvest_id: { type: 'string' },
          },
          required: ['harvest_id'],
        },
        HarvestDetail: {
          type: 'object',
          properties: {
            harvest_id: { type: 'string' },
            harvest_name: { type: 'string' },
            harvest_date: { type: 'string', format: 'date' },
            harvest_quantity: { type: 'number' },
          },
        },

        // Grades
        AddGrade: {
          type: 'object',
          properties: {
            grade_name: { type: 'string' },
            grade_value: { type: 'number' },
          },
          required: ['grade_name', 'grade_value'],
        },
        UpdateGrade: {
          type: 'object',
          properties: {
            grade_id: { type: 'string' },
            grade_name: { type: 'string' },
            grade_value: { type: 'number' },
          },
          required: ['grade_id', 'grade_name', 'grade_value'],
        },
        DeleteGrade: {
          type: 'object',
          properties: {
            grade_id: { type: 'string' },
          },
          required: ['grade_id'],
        },
        Grade: {
          type: 'object',
          properties: {
            grade_id: { type: 'string' },
            grade_name: { type: 'string' },
            grade_value: { type: 'number' },
          },
        },

        // Harvests
        AddHarvest: {
          type: 'object',
          properties: {
            employee_guid: { type: 'string' },
            harvest_start_dt: { type: 'string', format: 'date-time' },
            harvest_end_dt: { type: 'string', format: 'date-time' },
            harvest_weight: { type: 'number' },
            grade_guid: { type: 'string' },
          },
          required: ['employee_guid', 'harvest_start_dt', 'harvest_end_dt', 'harvest_weight', 'grade_guid'],
        },
        UpdateHarvest: {
          type: 'object',
          properties: {
            harvest_guid: { type: 'string' },
            harvest_start_dt: { type: 'string', format: 'date-time' },
            harvest_end_dt: { type: 'string', format: 'date-time' },
            harvest_weight: { type: 'number' },
          },
          required: ['harvest_guid', 'harvest_start_dt', 'harvest_end_dt', 'harvest_weight'],
        },
        DeleteHarvest: {
          type: 'object',
          properties: {
            harvest_guid: { type: 'string' },
          },
          required: ['harvest_guid'],
        },
        Harvest: {
          type: 'object',
          properties: {
            harvest_guid: { type: 'string' },
            employee_guid: { type: 'string' },
            harvest_start_dt: { type: 'string', format: 'date-time' },
            harvest_end_dt: { type: 'string', format: 'date-time' },
            harvest_weight: { type: 'number' },
            grade_guid: { type: 'string' },
          },
        },

        // Harvest Agronomists
        HarvestAgronomist: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier for the harvest agronomist' },
            name: { type: 'string', description: 'Name of the harvest agronomist' },
            email: { type: 'string', description: 'Email of the harvest agronomist' },
            phone: { type: 'string', description: 'Phone number of the harvest agronomist' },
          },
        },
        AddHarvestAgronomist: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Name of the harvest agronomist' },
            email: { type: 'string', description: 'Email of the harvest agronomist' },
            phone: { type: 'string', description: 'Phone number of the harvest agronomist' },
          },
          required: ['name', 'email', 'phone'],
        },
        UpdateHarvestAgronomist: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier for the harvest agronomist' },
            name: { type: 'string', description: 'Updated name of the harvest agronomist' },
            email: { type: 'string', description: 'Updated email of the harvest agronomist' },
            phone: { type: 'string', description: 'Updated phone number of the harvest agronomist' },
          },
          required: ['id'],
        },
        DeleteHarvestAgronomist: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier for the harvest agronomist to delete' },
          },
          required: ['id'],
        },

        // Employees
        AddEmployee: {
          type: 'object',
          properties: {
            employee_name: { type: 'string' },
            employee_position: { type: 'string' },
            employee_contact: { type: 'object' },
          },
          required: ['employee_name', 'employee_position'],
        },
        UpdateEmployee: {
          type: 'object',
          properties: {
            employee_guid: { type: 'string' },
            employee_name: { type: 'string' },
            employee_position: { type: 'string' },
            employee_contact: { type: 'object' },
          },
          required: ['employee_guid'],
        },
        DeleteEmployee: {
          type: 'object',
          properties: {
            employee_guid: { type: 'string' },
          },
          required: ['employee_guid'],
        },
        Employee: {
          type: 'object',
          properties: {
            employee_guid: { type: 'string' },
            employee_name: { type: 'string' },
            employee_position: { type: 'string' },
            employee_contact: { type: 'object' },
          },
        },

        // Professions
        AddProfession: {
          type: 'object',
          properties: {
            profession_name: { type: 'string' },
            profession_description: { type: 'string' },
          },
          required: ['profession_name'],
        },
        UpdateProfession: {
          type: 'object',
          properties: {
            profession_guid: { type: 'string' },
            profession_name: { type: 'string' },
            profession_description: { type: 'string' },
          },
          required: ['profession_guid', 'profession_name'],
        },
        DeleteProfession: {
          type: 'object',
          properties: {
            profession_guid: { type: 'string' },
          },
          required: ['profession_guid'],
        },
        Profession: {
          type: 'object',
          properties: {
            profession_guid: { type: 'string' },
            profession_name: { type: 'string' },
            profession_description: { type: 'string' },
          },
        },

        // Attributes
        AddAttribute: {
          type: 'object',
          properties: {
            attribute_name: { type: 'string' },
            attribute_value: { type: 'string' },
          },
          required: ['attribute_name', 'attribute_value'],
        },
        UpdateAttribute: {
          type: 'object',
          properties: {
            attribute_guid: { type: 'string' },
            attribute_name: { type: 'string' },
            attribute_value: { type: 'string' },
          },
          required: ['attribute_guid', 'attribute_name', 'attribute_value'],
        },
        DeleteAttribute: {
          type: 'object',
          properties: {
            attribute_guid: { type: 'string' },
          },
          required: ['attribute_guid'],
        },
        Attribute: {
          type: 'object',
          properties: {
            attribute_guid: { type: 'string' },
            attribute_name: { type: 'string' },
            attribute_value: { type: 'string' },
          },
        },

        // Material Types
        MaterialType: {
          type: 'object',
          properties: {
            material_type_id: { type: 'string' },
            material_type_name: { type: 'string' },
            material_type_description: { type: 'string' },
          },
        },
        AddMaterialType: {
          type: 'object',
          properties: {
            material_type_name: { type: 'string' },
            material_type_description: { type: 'string' },
          },
          required: ['material_type_name'],
        },
        UpdateMaterialType: {
          type: 'object',
          properties: {
            material_type_id: { type: 'string' },
            material_type_name: { type: 'string' },
            material_type_description: { type: 'string' },
          },
          required: ['material_type_id', 'material_type_name'],
        },
        DeleteMaterialType: {
          type: 'object',
          properties: {
            material_type_id: { type: 'string' },
          },
          required: ['material_type_id'],
        },

        // Units
        Unit: {
          type: 'object',
          properties: {
            unit_guid: { type: 'string', description: 'Unique identifier for the unit' },
            unit_name: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Unit name in Russian' },
                tk: { type: 'string', description: 'Unit name in Turkmen' },
              },
            },
          },
        },
        AddUnit: {
          type: 'object',
          properties: {
            unit_name: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Unit name in Russian' },
                tk: { type: 'string', description: 'Unit name in Turkmen' },
              },
              required: ['ru', 'tk'],
            },
          },
          required: ['unit_name'],
        },
        UpdateUnit: {
          type: 'object',
          properties: {
            unit_guid: { type: 'string', description: 'Unique identifier for the unit' },
            unit_name: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Unit name in Russian' },
                tk: { type: 'string', description: 'Unit name in Turkmen' },
              },
            },
          },
          required: ['unit_guid'],
        },
        DeleteUnit: {
          type: 'object',
          properties: {
            unit_guid: { type: 'string', description: 'Unique identifier for the unit' },
          },
          required: ['unit_guid'],
        },

        // AddMaterial Schema
        AddMaterial: {
          type: 'object',
          properties: {
            material_name: { type: 'string' },
            material_code: { type: 'string' },
            quantity: { type: 'number' },
            description: { type: 'string' },
            unit: { type: 'string' },
          },
          required: ['material_name', 'material_code', 'quantity'],
        },

        // UpdateMaterial Schema
        UpdateMaterial: {
          type: 'object',
          properties: {
            material_guid: { type: 'string' },
            material_name: { type: 'string' },
            material_code: { type: 'string' },
            quantity: { type: 'number' },
            description: { type: 'string' },
            unit: { type: 'string' },
          },
          required: ['material_guid', 'material_name', 'material_code'],
        },

        // DeleteMaterial Schema
        DeleteMaterial: {
          type: 'object',
          properties: {
            material_guid: { type: 'string' },
          },
          required: ['material_guid'],
        },

        // Material Schema (for listing or single material)
        Material: {
          type: 'object',
          properties: {
            material_guid: { type: 'string' },
            material_name: { type: 'string' },
            material_code: { type: 'string' },
            quantity: { type: 'number' },
            description: { type: 'string' },
            unit: { type: 'string' },
          },
        },

        // Groups
        Group: {
          type: 'object',
          properties: {
            group_guid: { type: 'string' },
            group_name: { type: 'string' },
            group_description: { type: 'string' },
          },
        },
        AddGroup: {
          type: 'object',
          properties: {
            group_name: { type: 'string' },
            group_description: { type: 'string' },
          },
          required: ['group_name'],
        },
        UpdateGroup: {
          type: 'object',
          properties: {
            group_guid: { type: 'string' },
            group_name: { type: 'string' },
            group_description: { type: 'string' },
          },
          required: ['group_guid'],
        },
        DeleteGroup: {
          type: 'object',
          properties: {
            group_guid: { type: 'string' },
          },
          required: ['group_guid'],
        },

        // MtrlAttrGroup Schemas
        MtrlAttrGroup: {
          type: 'object',
          properties: {
            group_guid: { type: 'string' },
            group_name: { type: 'string' },
            group_description: { type: 'string' },
          },
        },

        AddMtrlAttrGroup: {
          type: 'object',
          properties: {
            group_name: { type: 'string' },
            group_description: { type: 'string' },
          },
          required: ['group_name'],
        },

        UpdateMtrlAttrGroup: {
          type: 'object',
          properties: {
            group_guid: { type: 'string' },
            group_name: { type: 'string' },
            group_description: { type: 'string' },
          },
          required: ['group_guid'],
        },

        DeleteMtrlAttrGroup: {
          type: 'object',
          properties: {
            group_guid: { type: 'string' },
          },
          required: ['group_guid'],
        },

        // Barcodes
        Barcode: {
          type: 'object',
          properties: {
            barcode_guid: { type: 'string' },
            barcode_value: { type: 'object' },  // Assuming barcode_value is a JSON object
            mag_guid: { type: 'string' },
            modified_dt: { type: 'string', format: 'date-time' },
          },
        },

        AddBarcode: {
          type: 'object',
          properties: {
            barcode_value: { type: 'object' },  // JSON object for barcode data
            mag_guid: { type: 'string' },       // The GUID of the material attribute group
          },
          required: ['barcode_value', 'mag_guid'],
        },

        UpdateBarcode: {
          type: 'object',
          properties: {
            barcode_guid: { type: 'string' },
            barcode_value: { type: 'object' },
            mag_guid: { type: 'string' },
            modified_dt: { type: 'string', format: 'date-time' },
          },
          required: ['barcode_guid'],
        },

        DeleteBarcode: {
          type: 'object',
          properties: {
            barcode_guid: { type: 'string' },
          },
          required: ['barcode_guid'],
        },

        // Stands
        Stand: {
          type: 'object',
          properties: {
            stand_guid: { type: 'string', description: 'Unique identifier for the stand' },
            arch_guid: { type: 'string', description: 'Reference to the parent arch' },
            stand_name: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Stand name in Russian' },
                tk: { type: 'string', description: 'Stand name in Turkmen' },
              },
              required: ['ru', 'tk'],
            },
            stand_number: { type: 'integer', description: 'Stand number' },
            stand_desc: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Stand description in Russian' },
                tk: { type: 'string', description: 'Stand description in Turkmen' },
              },
            },
            stand_params: { type: 'object', description: 'Additional parameters for the stand' },
            modified_dt: { type: 'string', format: 'date-time', description: 'Last modification date' },
          },
        },
        AddStand: {
          type: 'object',
          properties: {
            arch_guid: { type: 'string', description: 'Reference to the parent arch' },
            stand_name: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Stand name in Russian' },
                tk: { type: 'string', description: 'Stand name in Turkmen' },
              },
              required: ['ru', 'tk'],
            },
            stand_number: { type: 'integer', description: 'Stand number' },
            stand_desc: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Stand description in Russian' },
                tk: { type: 'string', description: 'Stand description in Turkmen' },
              },
            },
            stand_params: { type: 'object', description: 'Additional parameters for the stand' },
          },
          required: ['arch_guid', 'stand_name', 'stand_number'],
        },
        UpdateStand: {
          type: 'object',
          properties: {
            stand_guid: { type: 'string', description: 'Unique identifier for the stand' },
            stand_name: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Stand name in Russian' },
                tk: { type: 'string', description: 'Stand name in Turkmen' },
              },
              required: ['ru', 'tk'],
            },
            stand_number: { type: 'integer', description: 'Stand number' },
            stand_desc: {
              type: 'object',
              properties: {
                ru: { type: 'string', description: 'Stand description in Russian' },
                tk: { type: 'string', description: 'Stand description in Turkmen' },
              },
            },
            stand_params: { type: 'object', description: 'Additional parameters for the stand' },
          },
          required: ['stand_guid', 'stand_name', 'stand_number'],
        },
        DeleteStand: {
          type: 'object',
          properties: {
            stand_guid: { type: 'string', description: 'Unique identifier for the stand' },
          },
          required: ['stand_guid'],
        },

      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;