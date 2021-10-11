import { computed } from '@nuxtjs/composition-api'
import { faChevronDown, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons'

/** Twitter Icon */
export const twitter = computed(() => faTwitter)

/** Twitch Icon */
export const twitch = computed(() => faTwitch)

/** Youtube Icon */
export const youtube = computed(() => faYoutube)

/** 下矢印 */
export const chevronDown = computed(() => faChevronDown)

/** スピナー */
export const spinner = computed(() => faSpinner)
