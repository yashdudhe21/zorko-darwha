import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'aghzsrff',
    dataset: 'production',
  },
  // Self-hosted static build served from /studio on our own domain, so we
  // don't want the runtime auto-update loader (keeps the build self-contained).
  autoUpdates: false,
})
