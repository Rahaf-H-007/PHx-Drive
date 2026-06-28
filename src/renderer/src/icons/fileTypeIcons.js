import {
  ArchiveBoxIcon,
  DocumentChartBarIcon,
  DocumentIcon,
  FolderIcon,
  PhotoIcon,
  PresentationChartLineIcon,
  SpeakerWaveIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline'

// use this to display icon depending on file mime type/folder
const mimeTypeIcons = {
  //pdfs
  'application/pdf': {
    TypeIcon: DocumentIcon,
    typeIconClass: 'text-red-700'
  },

  //word
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    TypeIcon: DocumentIcon,
    typeIconClass: 'text-blue-700'
  },
  //excel
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    TypeIcon: DocumentChartBarIcon,
    typeIconClass: 'text-green-500'
  },
  //powerproint
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    TypeIcon: PresentationChartLineIcon,
    typeIconClass: 'text-yellow-500'
  },
  //zip
  'application/zip': {
    TypeIcon: ArchiveBoxIcon,
    typeIconClass: 'text-orange-500'
  }
}

//if its text/not any of the above or image or video
const defaultIcon = {
  TypeIcon: DocumentIcon,
  typeIconClass: 'text-gray-400'
}

const imageIcon = {
  TypeIcon: PhotoIcon,
  typeIconClass: 'text-blue-600'
}

const videoIcon = {
  TypeIcon: VideoCameraIcon,
  typeIconClass: 'text-blue-600'
}

const audioIcon = {
  TypeIcon: SpeakerWaveIcon,
  typeIconClass: 'text-gray-600'
}

const folderIcon = {
  TypeIcon: FolderIcon,
  typeIconClass: 'text-amber-500'
}

export function getFileIcon(file) {
  //check if its a folder
  if (file.file_kind === 'Folder') {
    return folderIcon
  }

  //if not then check mime type
  //all image types
  if (file.mime_type.startsWith('image/')) {
    return imageIcon
  }

  //all video types
  if (file.mime_type.startsWith('video/')) {
    return videoIcon
  }

  //all audio types
  if (file.mime_type.startsWith('audio/')) {
    return audioIcon
  }

  return mimeTypeIcons[file.mime_type] ?? defaultIcon
}
