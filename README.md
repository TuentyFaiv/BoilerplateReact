# Template Frontend with React and Webpack CSR
<p align="center">
  <img src="https://img.shields.io/badge/react%20-%2361dafb.svg?&style=for-the-badge&logo=react&logoColor=white" alt="React badge" />
  <img src="https://img.shields.io/badge/react%20router%20-%23f44250.svg?&style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router badge" />
  <img src="https://img.shields.io/badge/i18next%20-%2326a69a.svg?&style=for-the-badge&logo=i18next&logoColor=white" alt="I18next badge" />
  <img src="https://img.shields.io/badge/sass%20-%23bf4080.svg?&style=for-the-badge&logo=sass&logoColor=white" alt="Sass badge" />
  <img src="https://img.shields.io/badge/webpack%20-%235299c8.svg?&style=for-the-badge&logo=webpack&logoColor=white" alt="Webpack badge" />
  <img src="https://img.shields.io/badge/babel%20-%23f5da55.svg?&style=for-the-badge&logo=babel&logoColor=white" alt="Babel badge" />
  <img src="https://img.shields.io/badge/eslint%20-%234b32c3.svg?&style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint badge" />
  <img src="https://img.shields.io/badge/formik%20-%231d4ed8.svg?&style=for-the-badge&logo=formik&logoColor=white" alt="Formik badge" />
  <img src="https://img.shields.io/badge/yup%20-%23111827.svg?&style=for-the-badge&logo=yup&logoColor=white" alt="Yup badge" />
  <img src="https://img.shields.io/badge/sweetalert%20-%23f27474.svg?&style=for-the-badge&logo=sweetalert&logoColor=white" alt="Sweetalert badge" />
</p>

This template is made in React for UI, i18n for the locales, Formik for the logic in forms and Yup for validations, with Sweetalert and React Router, SASS for the styles and Webpack for the bundle

### Before all:
**Create a `.env` and a `.env.development` file from the `.env.example` template file**


### Scripts:
- `npm install` to install all dependencies
- `npm start` for development mode and start with the creation of a new universe
- `npm run build` to make the build of vendor and project
- `npm run build:vendor` to build only the vendor
- `npm run build:project` to build only the project

## Folder architecture

> - public/
> - src/
>   - common/
>     - locales/
>       - lang/namespace.json // Example: es/translation.json
>     - schemas/
>       - index.js
>       - auth.js
>     - config.js
>   - components/
>     - Header.jsx
>   - containers/
>     - ContainerExample.jsx
>   - context/
>     - AppContext.jsx
>     - reducer.js
>   - hoc/
>     - withCustomHoc.jsx
>   - hooks/
>     - index.js
>     - useCustomHook.js
>   - pages/
>     - Home.jsx
>   - styles/
>     - pages/
>       - responsive/
>         - _Home.scss
>       - Home.scss
>     - components/
>       - responsive/
>         - _Header.scss
>       - Header.scss
>     - _Mixins.scss
>     - General.scss
>   - App.jsx
>   - i18n.js
>   - index.js
