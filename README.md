## <span style="color: #9f4a19">Project description:</span>

<p style="text-align: left;"><img alt="breef" src="https://uploads-ssl.webflow.com/5e4d24d0d11c7440ba421ee3/60e97e96d34c3d5645163ef5_Breef-logo.png" width="250"></p>
<div style="color: #9f4a19; background-color: #9f4a19; height: 1px; margin-bottom: 15px"/>

#### A platform that helps clients and agencies find each other.

#### Clients create a brief for the project they want to implement, and agencies provide information about themselves.

#### The platform administrator selects the agency options that best suit the request, after which the client can choose one of them to further implement their ideas outside the platform.

###

<div style="color: #9f4a19; background-color: #9f4a19; height: 1px; margin-bottom: 15px"/>

## <span style="color: #9f4a19">Installing / Getting started (optional)</span>

#### You will need node and npm (or yarn) installed globally on your machine:

`npm install -g npm` or `npm install -g yarn`

#### To check the versioning, use:

`node -v` `npm -v` or `yarn -v`

###

### Use nvm to control the version of the node

Node Version Manager (NVM in short) is a simple bash script to manage multiple active node.js versions on your Linux system. It allows you to install multiple node.js versions, view all versions available for installation and all installed versions on your system.

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash` or `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`

#### Next, verify if the nvm has been installed on your system using the following command.

`nvm --version`

#### It will show output as ‘nvm‘ if the installation was successful.

#### To download, compile, and install the latest release of node, run the following command:

`nvm install node`

###

## <span style="color: #9f4a19">Generate an application:</span>

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@new-curated-app/mylib`.

## <span style="color: #9f4a19">Build with:</span>

> -   [React](https://ru.reactjs.org/)
> -   [Redux-toolkit](https://redux-toolkit.js.org/)
> -   [Rtk-query](https://redux-toolkit.js.org/rtk-query/overview)
> -   [Nextjs](https://nextjs.org/)
> -   [Typescript](https://www.typescriptlang.org/)
> -   [React-hook-form](https://react-hook-form.com/)
> -   [Yup](https://github.com/jquense/yup/tree/pre-v1#api)
> -   [Emotion](https://emotion.sh/docs/styled)
> -   [React-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
> -   [Nx-monorepos](https://nx.dev/getting-started/intro)
> -   [Sentry](https://docs.sentry.io/platforms/javascript/guides/react/)
> -   [React-stripe-js](https://stripe.com/docs/stripe-js/react)
> -   [React-calendly](https://www.npmjs.com/package/react-calendly#basic-usage)
> -   [React-datepicker](https://www.npmjs.com/package/react-datepicker)
> -   [Moment-timezone](https://momentjs.com/timezone/docs/)
> -   [Moment](https://momentjs.com/docs/)
> -   [Framer-motion](https://www.framer.com/motion/)
> -   [Emoji-picker-react](https://github.com/ealush/emoji-picker-react)
> -   [Giphy/react-components](https://www.npmjs.com/package/@giphy/react-components)
> -   [React-oauth/google](https://react-oauth.vercel.app/)

The structure of the frontend application will follow the NX ideology. Nx is a smart, fast and extensible build system with first class
monorepo support and powerful integrations. The monorepository makes it possible to integrate multiple applications using
different development technologies (nextjs, react, angular, nodejs).

The project has different roles with different accesses, each role will be a separate application and will be implemented using react js.
ExpandedStepperNavigation will take place only through private routes, to control the access of different roles. Authorization will be put in a separate
application and will be implemented using next js - (ssr), pages will have public access.

Only functional components will be used. A redux-toolkit will be used to manage the state of the application. For asynchronous
queries (accessing the rest api) rtk-query will be used.

The test files will be stored in the same folder as the component files / stores / slices / functions - everything that relates to the
reusable code (libs and shared folders) .
In the apps folders, the files with tests will be stored in the specs folder.

In more detail: https://confluence.light-it.tools/display/PRCNP/Libraries+licenses

## <span style="color: #9f4a19">Setting up Dev:</span>

Clone down this repository:
`https://gitlab.light-it.tools/breef/frontend.git` or `git@gitlab.light-it.tools:breef/frontend.git`

cd your-project (FRONTEND)/

Install all req'd dependencies:
`npm install` or `yarn`

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

### Building

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## <span style="color: #9f4a19">Deploying/Publishing:</span>

https://confluence.light-it.tools/display/PRCNP/%5BWIP%5D+NEW+Git+flow

## <span style="color: #9f4a19">Git:</span>

https://confluence.light-it.tools/display/PRCNP/%5BWIP%5D+NEW+Git+flow

## <span style="color: #9f4a19">Environments:</span>

https://confluence.light-it.tools/display/PRCNP/Front-end+.env+variables

## <span style="color: #9f4a19">Testing:</span>

To write tests, we use the @testing-library/react library.

Covering components with unit tests.
To run tests, use the commands:

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## <span style="color: #9f4a19">Structure and naming:</span>

<pre>
breef/
├── apps/
│  ├── auth/ 
│  │  ├── pages/*.tsx
│  │  ├── setup/*.tsx
│  │  ├── hooks/*.tsx|ts
│  │  ├── specs/*.spec.tsx
│  │  ├── components/**/*.ts|tsx
│  │  ├── hoc/*.tsx
│  │  └── public/fonts/**/*.ttf
│  ├── client/ 
│  │  └── etc...
│  └── agency/ 
│     └── etc...
└── libs/shared
    ├── assets/src/lib
    |   ├── images/**/*.png|svg
    |   ├── styles/*.ts|tsx
    |   └── index.ts
    ├── constants/src/lib
    |   ├── filters/*.ts|tsx
    |   ├── links/*.ts|tsx
    |   └── index.ts
    ├── data-access-*/src/lib
    |   ├── adapters/*.ts|tsx,*.spec.ts|tsx
    |   ├── constants/*.ts|tsx
    |   ├── services/*.ts|tsx,*.spec.ts|tsx
    |   └── index.ts
    ├── feature-*/src/lib
    |   ├── components/
    |   |   ├── customComponent
    |   |   |   ├── CustomComponent.tsx
    |   |   |   ├── CustomComponent.styled.tsx
    |   |   |   └── CustomComponent.spec.tsx
    |   |   └── index.ts
    |   ├── utils/**/*.ts|tsx,*.spec.ts|tsx
    |   ├── store/*.ts|tsx,*.spec.ts|tsx
    |   ├── hooks/*.ts|tsx,*.spec.ts|tsx
    |   ├── types/*.ts
    |   └── index.ts
    ├── hooks/src/lib
    |   ├── *.ts|tsx,*.spec.ts|tsx
    |   └── index.ts
    ├── types/src/lib
    |   ├── **/*.ts|tsx
    |   └── index.ts
    ├── ui-components/src/lib
    |   ├── customComponent
    |   |   ├── CustomComponent.tsx
    |   |   ├── CustomComponent.styled.tsx
    |   |   └── CustomComponent.spec.tsx
    |   └── index.ts
    └── utils/src/lib
        ├── *.ts|tsx,*.spec.ts|tsx
        └── index.ts
</pre>

## <span style="color: #9f4a19">Structure and naming from UI-KIT:</span>

> The five distinct levels of atomic design — atoms > molecules > organisms > templates > pages — map incredibly well to React’s component-based architecture.

<pre>
breef/
├── apps/
└── libs/
    ├── shared/
    └── ui-kit/src/lib
        ├── atoms/
        |   ├── button/
        |   |   ├── Input.component.tsx
        |   |   ├── Button.styled.tsx
        |   |   ├── Button.spec.tsx
        |   |   ├── Button.stories.tsx
        |   |   └── README.md
        |   ├── input/
        |   └──index.ts
        ├── molecules/
        |   ├── post/
        |   ├── nav/
        |   └──index.ts
        ├── organisms/
        |   ├── header/
        |   ├── footer/
        |   └──index.ts
        └── index.ts
</pre>

## <span style="color: #9f4a19">API:</span>

API Documentation:

https://dev.new.breef.com/api/swagger/
https://staging.new.breef.com/api/swagger/

### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

###

<div style="color: #9f4a19; background-color: #9f4a19; height: 1px; margin-bottom: 15px"/>

###

<div style="color: #9f4a19; background-color: #9f4a19; height: 1px; margin-bottom: 15px"/>

###
