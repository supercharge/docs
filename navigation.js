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
      Development: 'development',
      Deployment: 'deployment',
      Bootstrappers: 'bootstrappers'
    }
  },

  Essentials: {
    slug: 'essentials',
    sections: {
      Routing: 'routing',
      Middleware: 'middleware',
      Plugins: 'plugins',
      Decorations: 'decorations',
      'CSRF Protection': 'csrf-protection',
      'App Lifecycle': 'app-lifecycle',
      'Request Lifecycle': 'request-lifecycle',
      Authentication: 'authentication',
      Authorization: 'authorization',
      Validation: 'validation'
    }
  },

  Amplifier: {
    slug: 'amplifier',
    sections: {
      'Craft CLI': 'craft-cli',
      Requests: 'requests',
      Responses: 'responses',
      Mailer: 'mailer',
      Filesystem: 'filesystem',
      Hashing: 'hashing',
      Encryption: 'encryption',
      Events: 'events',
      Logger: 'logger',
      Session: 'session',
      Collections: 'collections',
      'Promise Pool': 'promise-pool'
    }
  },

  Database: {
    slug: 'database',
    sections: {
      'MongoDB Preset': 'mongodb-preset',
      Connectors: 'database-connectors',
      Pagination: 'pagination'
    }
  },

  Frontend: {
    slug: 'frontend',
    sections: {
      Assets: 'frontend-assets',
      Handlebars: 'handlebars',
      'Built-in Helpers': 'handlebars-helpers'
    }
  },

  Testing: {
    slug: 'testing',
    sections: {
      'Getting Started': 'testing',
      'Create & Debug Tests': 'create-and-debug-tests',
      'HTTP Tests': 'http-tests',
      Fakes: 'testing-fakes',
      Database: 'database-testing'
    }
  },

  'In the Universe': {
    slug: 'in-the-universe',
    sections: {
      Hercules: 'hercules',
      'Rate Limiting': 'rate-limiting',
      'Geo Locating': 'geo-locating'
    }
  }
}
