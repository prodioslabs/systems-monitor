import type { ConfigProvider } from 'antd'
import { colors } from 'utils/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

type Theme = React.ComponentProps<typeof ConfigProvider>['theme']

export const THEME: Theme = {
  token: {
    borderRadius: 2,

    colorPrimary: colors.primary,
    colorText: colors['text-primary'],
    colorTextTertiary: colors['text-secondary'],
    colorWarning: colors.warning,

    fontFamily: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans].join(', '),
    fontSizeHeading3: 20,
  },

  components: {
    Table: {
      colorBgContainer: colors.gray['800'],
      colorFillAlter: colors.gray['900'],
      colorFillSecondary: colors.gray['900'],
      colorSplit: colors.gray['600'],
    },
  },
}
