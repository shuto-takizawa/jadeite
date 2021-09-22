import { computed } from '@nuxtjs/composition-api'
import { faTwitter, faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons'

/** Twitter Icon */
export const twitter = computed(() => faTwitter)

/** Twitch Icon */
export const twitch = computed(() => faTwitch)

/** Youtube Icon */
export const youtube = computed(() => faYoutube)
