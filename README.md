# Template Frontend with React and Webpack CSR
<p align="center">
  <img src="https://img.shields.io/badge/react%20-%2361dafb.svg?&style=for-the-badge&logo=react&logoColor=white" alt="React badge" />
  <img src="https://img.shields.io/badge/react%20router%20-%23f44250.svg?&style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router badge" />
  <img src="https://img.shields.io/badge/i18next%20-%2326a69a.svg?&style=for-the-badge&logo=i18next&logoColor=white" alt="I18next badge" />
  <img src="https://img.shields.io/badge/styled components%20-%23db7093.svg?&style=for-the-badge&logo=styledcomponents&logoColor=white" alt="Styled components badge" />
  <img src="https://img.shields.io/badge/vite%20-%23BD34FE.svg?&style=for-the-badge&logo=vite&logoColor=white" alt="Vite badge" />
  <img src="https://img.shields.io/badge/typescript%20-%233178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript badge" />
  <img src="https://img.shields.io/badge/eslint%20-%234b32c3.svg?&style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint badge" />
  <img src="https://img.shields.io/badge/formik%20-%231d4ed8.svg?&style=for-the-badge&logo=formik&logoColor=white" alt="Formik badge" />
  <img src="https://img.shields.io/badge/yup%20-%23111827.svg?&style=for-the-badge&logo=yup&logoColor=white" alt="Yup badge" />
  <img src="https://img.shields.io/badge/sweetalert%20-%23f27474.svg?&style=for-the-badge&logo=sweetalert&logoColor=white" alt="Sweetalert badge" />
</p>

This template is made in Typescript, React for UI, i18n for the locales, Formik for the logic in forms and Yup for validations, with Sweetalert and React Router, SASS for the styles and Webpack for the bundle

### Scripts:
- `pnpm install` to install all dependencies
- `pnpm start` for development mode and start with the creation of a new universe
- `pnpm build` to make the build of vendor and project
- `pnpm preview`

## Environment variables
To use environment variables copy the file `.env.example` two times and rename one as `.env.development.local` and the other as `.env.production.local`, the first is for development mode and the second for production mode.

> ### Note:
> Never put variables in `.env.example`

## Alias
| Name              | Description                                                  | Example        |
| ----------------- | ------------------------------------------------------------ | -------------- |
| @components       | All components on src/components/index.ts                    | `import { Header } from "@components";` |
| @containers       | All containers on src/containers/index.ts                    | `import { SigninForm } from "@containers";` |
| @context          | All contexts on src/context/index.ts                         | `import { AppProvider } from "@context";` |
| @hooks            | All custom hooks on src/hooks/index.ts                       | `import { useModal } from "@hooks";` |
| @hoc              | All custom hoc(higher-order component) on src/hoc/index.ts   | `import { withAuth } from "@hoc";` |
| @pages            | All pages on src/pages/*                                     | `const Home = lazy(() => import("@pages/Home"));` or `import Home from "@pages/Home";` |
| @utils            | All functions on src/common/utils.ts                         | `import { PaymentError } from "@utils` |
| @typing           | All typing on src/common/typing/*                            | `import { SigninValues } from "@iterfaces` |
| @config           | Global config on src/common/config.ts                        | `import config from "@config";` |
| @schemas          | All schemas for formik on src/common/schemas/index.ts        | `import { SigninSchema } from "@schemas";` |
| @services         | All services for connections on src/common/services/index.ts | `import { signin } from "@services";` |
| @cstyles | All styles for components on src/styles/components/*         | `import "@cstyles/Header.scss";` |
| @stylesPages      | All styles for pages on src/styles/pages/*                   | `import "@pstyles/Home.scss";` |
| @styles           | Globals styles on src/styles/Globals.scss                    | `import "@styles";` |
| @images           | All images on src/assets/images/*                            | `import Background from "@images/background.png";` | 
| @icons            | All icons on src/assets/images/icons/*                       | `import Logo from "@icons/logo.svg";` |
| @videos           | All videos on src/assets/videos/*                            | `import Video from "@videos/video.mp4";` |
| @fonts            | All fonts on src/assets/fonts/*                              | `url("@fonts/Lato.ttf");` |


## Folder architecture

> - public/
>   - locales/
>     - lang/namespace.json // Example: es/translation.json
> - src/
>   - common/
>     - typing/
>       - interface.ts
>       - proptypes.ts
>       - types.ts
>     - schemas/
>       - index.ts
>       - auth.ts
>     - services/
>       - index.ts
>       - auth.ts
>     - config.ts
>     - utils.ts
>   - components/
>     - Header.tsx
>     - index.ts
>   - containers/
>     - ContainerExample.tsx
>     - index.ts
>   - context/
>     - app/
>       - AppContext.tsx
>       - reducer.ts
>     - service/
>       - ServiceContext.tsx
>       - http.ts
>     - index.ts
>   - hoc/
>     - withCustomHoc.tsx
>     - index.ts
>   - hooks/
>     - index.ts
>     - useCustomHook.ts
>   - pages/
>     - Home.tsx
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
>     - Globals.scss
>   - i18n.ts
>   - main.ts
>   - routes.tsx
