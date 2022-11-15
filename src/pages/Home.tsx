import { useTranslation } from "react-i18next";

import { Home as Styles } from "@pstyles";

export default function Home() {
  const { t } = useTranslation();

  return (
    <Styles.Section>
      <Styles.Title>{t("home-title")}</Styles.Title>
    </Styles.Section>
  );
}
