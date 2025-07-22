import { mapGetters } from 'vuex'
import { getTranslation } from '@/utils/i18n'

export default {
  computed: {
    ...mapGetters(['currentLanguage'])
  },
  methods: {
    $t(key) {
      return getTranslation(this.currentLanguage, key)
    }
  }
} 