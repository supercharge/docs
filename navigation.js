'use strict'

module.exports = {
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
      'Configuration & Env': 'configuration',
      'Directory Structure': 'directory-structure',
      Application: 'application',
      // 'App Lifecycle': 'app-lifecycle',
      Development: 'development',
      Deployment: 'deployment',
      // Bootstrappers: 'bootstrappers'
      'Service Providers': 'service-providers'
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
      'CSRF Protection': 'csrf-protection',
      // 'Request Lifecycle': 'request-lifecycle',
      // Authentication: 'authentication',
      // Authorization: 'authorization',
      // Validation: 'validation'
    }
  },

  Amplifier: {
    slug: 'amplifier',
    sections: {
      'Craft CLI': 'craft-cli',
      // Mailer: 'mailer',
      // Hashing: 'hashing',
      // Encryption: 'encryption',
      Events: 'events',
      Logger: 'logger',
      // Session: 'session',
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

  Packages: {
    slug: 'packages',
    sections: {
      Arrays: 'arrays',
      Collections: 'collections',
      Filesystem: 'filesystem',
      Goodies: 'goodies',
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
      'Built-in Helpers': 'handlebars-helpers'
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
