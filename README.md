nestfinders-realty/
├── .env                             # Environment variables (MONGODB_URI, JWT_SECRET, PORT)
├── .gitignore                       # Node modules & uploaded document exclusions
├── package.json                     # Express, Mongoose, EJS, Multer, Nodemailer, JWT dependencies
├── server.js                        # Core Express application entry point
├── public/                          # Static assets directory
│   ├── css/
│   │   └── style.css                # Custom responsive CSS design system
│   ├── images/                      # Fallback property images & site logo
│   └── uploads/                     # Public user upload directory
│       └── verifications/           # Multi-field uploaded CAC & ID documents
├── scripts/                         # Automated administrative CLI scripts
│   ├── createAdmin.js               # Seed Master Admin account
│   └── seedProperties.js            # Seed initial property inventory
├── src/
│   ├── config/
│   │   └── db.js                    # Mongoose database connection configuration
│   ├── controllers/                 # MVC logic modules
│   │   ├── adminController.js       # Executive dashboard & JWT authentication
│   │   ├── inquiryController.js     # Public inquiry form submissions & Nodemailer alerts
│   │   ├── pageController.js        # Static & informational pages (About, Services, Developments)
│   │   ├── propertyController.js    # Public property filtering & agent property publishing
│   │   └── verificationController.js# Agent CAC document submission & admin review queue
│   ├── middleware/                  # Request processing middlewares
│   │   ├── auth.js                  # JWT cookie authentication & role checks
│   │   ├── upload.js                # Multer middleware for property photos
│   │   └── verificationUpload.js    # Multer middleware for CAC & government ID uploads
│   ├── models/                      # Mongoose schema definitions
│   │   ├── Inquiry.js               # Client message schema
│   │   ├── Property.js              # Real estate listing schema
│   │   └── User.js                  # Admin & agent account schema with CAC fields
│   └── routes/                      # Express router endpoints
│       ├── adminRoutes.js           # Mounted at /admin
│       ├── agentRoutes.js           # Mounted at /agent
│       ├── inquiryRoutes.js         # Mounted at /api/inquiries
│       ├── pageRoutes.js            # Mounted at /
│       ├── propertyRoutes.js        # Mounted at /properties
│       └── verificationRoutes.js    # Mounted at /
└── views/                           # EJS view templates
    ├── 404.ejs                      # Error page
    ├── about.ejs                    # Corporate about page
    ├── contact.ejs                  # Client inquiry form
    ├── developments.ejs             # Real estate project showcase
    ├── index.ejs                    # Homepage
    ├── listings.ejs                 # Searchable property catalog
    ├── services.ejs                 # Corporate services page
    ├── admin/                       # Administrative views
    │   ├── dashboard.ejs            # Executive metrics & inquiry management
    │   ├── login.ejs                # Admin login form
    │   └── verifications.ejs        # Agent CAC review queue
    ├── agent/                       # Agent portal views
    │   ├── properties.ejs           # Property management & upload portal
    │   └── verify.ejs               # CAC number & document submission form
    └── partials/                    # Reusable EJS snippets
        ├── footer.ejs               # Site footer component
        └── header.ejs               # Navigation bar component