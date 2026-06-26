import {
  ArchiveBoxIcon,
  DocumentChartBarIcon,
  DocumentIcon,
  PhotoIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline'

//TODO: later make it based on mime types not extensions
export const fileTypeIcons = {
  pdf: {
    TypeIcon: DocumentIcon,
    typeIconClass: 'text-red-700'
  },
  docx: {
    TypeIcon: DocumentIcon,
    typeIconClass: 'text-red-700'
  },
  txt: {
    TypeIcon: DocumentIcon,
    typeIconClass: 'text-red-700'
  },

  //zip
  zip: {
    TypeIcon: ArchiveBoxIcon,
    typeIconClass: 'text-orange-500'
  },

  //pptx
  pptx: {
    TypeIcon: PresentationChartLineIcon,
    typeIconClass: 'text-yellow-500'
  },

  //excel
  xlsx: {
    TypeIcon: DocumentChartBarIcon,
    typeIconClass: 'text-green-500'
  },

  //photos
  jpg: { TypeIcon: PhotoIcon, typeIconClass: 'text-blue-600' },
  png: { TypeIcon: PhotoIcon, typeIconClass: 'text-blue-600' }
}
