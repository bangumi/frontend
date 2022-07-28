import { useLocalstorageState } from 'rooks'

export interface LocalConfig {
  doesGroupDescriptionNeedClamp: boolean
}

const defaultLocalConfig: LocalConfig = {
  doesGroupDescriptionNeedClamp: true
}

export interface UseLocalConfig {
  getConfig: (key: keyof LocalConfig) => LocalConfig[typeof key]
  setConfig: (key: keyof LocalConfig, value: LocalConfig[typeof key]) => void
  config: LocalConfig
}

export const useLocalConfig = (): UseLocalConfig => {
  const [localConfig, setLocalConfig] = useLocalstorageState<LocalConfig>('localConfig', defaultLocalConfig)

  return {
    getConfig (key) {
      return localConfig[key]
    },
    setConfig (key, value) {
      setLocalConfig({ ...localConfig, [key]: value })
    },
    config: localConfig
  }
}
