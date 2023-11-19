'use strict'

export default {
  Introduction: {
    slug: 'introduction',
    sections: {
      'About Supercharge': 'about-supercharge',
      Contribute: 'contribute'
      // 'Upgrade Guide': 'upgrade'
    }
  },

  'Getting Started': {
    slug: 'getting-started',
    sections: {
      Installation: 'installation',
      'Directory Structure': 'directory-structure',
      'Configuration & Env': 'configuration',
      Application: 'application',
      // 'App Lifecycle': 'app-lifecycle',
      'Error Handling': 'error-handling',
      // Development: 'development',
      Deployment: 'deployment',
      // Bootstrappers: 'bootstrappers'
      'Service Container': 'service-container',
      'Service Providers': 'service-providers',
    }
  },

  HTTP: {
    slug: 'essentials',
    sections: {
      Routing: 'routing',
      Context: 'http-context',
      Requests: 'requests',
      Responses: 'responses',
      Controllers: 'controllers',
      Middleware: 'middleware',
      Session: 'session',
      'CSRF Protection': 'csrf-protection',
      // 'Request Lifecycle': 'request-lifecycle',
      // Authentication: 'authentication',
      // Authorization: 'authorization',
      // Validation: 'validation'
    }
  },

  Techniques: {
    slug: 'techniques',
    sections: {
      'Craft Console': 'craft-console',
      // Mailer: 'mailer',
      // Hashing: 'hashing',
      // Encryption: 'encryption',
      // Events: 'events',
      Logger: 'logger',
      // Queues: 'queues'
    }
  },

  // Database: {
  //   slug: 'database',
  //   sections: {
  //     Connectors: 'database-connectors',
  //     // Pagination: 'pagination'
  //   }
  // },

  Security: {
    slug: 'security',
    sections: {
      Encryption: 'encryption',
      Hashing: 'hashing',
    }
  },

  Packages: {
    slug: 'packages',
    sections: {
      Arrays: 'arrays',
      Collections: 'collections',
      Filesystem: 'filesystem',
      Goodies: 'goodies',
      Macroable: 'macroable',
      Map: 'map',
      'Promise Pool': 'promise-pool',
      Set: 'set',
      Streams: 'streams',
      Strings: 'strings',
      Sttp: 'sttp',
    }
  },

  Frontend: {
    slug: 'frontend',
    sections: {
      Views: 'views',
      Assets: 'frontend-assets',
      Handlebars: 'handlebars',
      'Built-in Helpers': 'handlebars-helpers',
      Inertia: 'inertia'
    }
  },

  // Testing: {
  //   slug: 'testing',
  //   sections: {
  //     'Getting Started': 'testing',
  // 'Create & Debug Tests': 'create-and-debug-tests',
  // 'HTTP Tests': 'http-tests',
  // Fakes: 'testing-fakes',
  // Database: 'database-testing'
  // }
  // },
}
