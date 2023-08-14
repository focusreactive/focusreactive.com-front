export const VideoRoomSpeaker = {
  name: 'videoRoomSpeaker',
  title: 'Video Room Speaker',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
    },
  ],
}

export const VideoRoom = {
  name: 'videoRoom',
  title: 'Video Room',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
    },
    {
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{type: 'videoRoomSpeaker'}],
    },
  ],
}

export default {
  name: 'discussions',
  title: 'Discussions',
  type: 'object',
  fields: [
    {
      name: 'blockTitle',
      title: 'Block Title',
      type: 'string',
      description: 'Visible only in CMS',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'videoRooms',
      title: 'Video Rooms',
      type: 'array',
      of: [{type: 'videoRoom'}],
    },
  ],
}
