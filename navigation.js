'use strict'

module.exports = {
  Introduction: {
    slug: 'introduction',
    sections: {
      'What is Boost?': 'what-is-boost',
      Contribute: 'contribute'
    }
  },
  'Getting Started': {
    slug: 'getting-started',
    sections: {
      Installation: 'installation',
      'Configuration & Env': 'configuration',
      'Directory Structure': 'directory-structure',
      Globals: 'globals',
      Development: 'development',
      Deployment: 'deployment'
    }
  },
  Basics: {
    slug: 'basics',
    sections: {
      Routing: 'routing',
      'Request Lifecycle': 'request-lifecycle',
      Authentication: 'authentication',
      'CSRF Protection': 'csrf-protection',
      Validations: 'validations'
    }
  },
  Database: {
    slug: 'database',
    sections: {
      'MongoDB and Mongoose': 'mongodb-and-mongoose',
      Paginator: 'paginator'
    }
  },
  Frontend: {
    slug: 'frontend',
    sections: {
      Handlebars: 'handlebars',
      'Built-in Helpers': 'handlebars-helpers',
      Assets: 'frontend-assets'
    }
  },
  Utilities: {
    slug: 'utilities',
    sections: {
      Filesystem: 'filesystem',
      'Mailer and Mailable': 'mailer-and-mailable',
      Hashinator: 'hashinator',
      Encryptor: 'encryptor',
      Logger: 'logger',
      Request: 'request-utilities',
      Response: 'response-utilities'
    }
  },
  'In the Universe': {
    slug: 'in-the-universe',
    sections: {
      Hometown: 'hometown',
      'Rate Limiting': 'rate-limiting'
    }
  }
}
