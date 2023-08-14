import page from '../pages/page'
import event from './event'
import schedule from './schedule'
import followUs from './followUs'
import fullTicket from './fullTicket'
import hero, {HeroSpeakers, HeroStatistic} from './hero'
import discussions, {VideoRoom, VideoRoomSpeaker} from './discussions'
import features, {Feature} from './features'
import speakers, {Speaker} from './speakers'
import {link} from './link'
import bars, {Bar} from './bars'

export const schemaTypes = [
  hero,
  HeroStatistic,
  HeroSpeakers,
  link,
  page,
  event,
  features,
  Feature,
  schedule,
  discussions,
  VideoRoom,
  VideoRoomSpeaker,
  fullTicket,
  speakers,
  Speaker,
  followUs,
  bars,
  Bar,
]
