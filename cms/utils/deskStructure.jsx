import React, {useCallback, useEffect} from 'react'
import debounce from 'lodash.debounce'

const sendPostMessage = () => {
  console.log('sendPostMessage')

  document
    .getElementById('preview_iframe')
    .contentWindow.postMessage('reload()', 'https://11ty-sanity-mvp.vercel.app')
}

const JsonPreview = ({document: sanityDocument}) => {
  const debouncedChangeHandler = useCallback(debounce(sendPostMessage, 1000), [])

  useEffect(() => {
    if (debouncedChangeHandler) {
      debouncedChangeHandler()
    }
  }, [sanityDocument?.displayed?._updatedAt, debouncedChangeHandler])

  return (
    <iframe
      title="page"
      id="preview_iframe"
      src={`https://11ty-sanity-mvp.vercel.app/api/preview?slug=${sanityDocument.displayed?.slug?.current}`}
      style={{height: '100%', width: '100%'}}
    />
  )
}
export const defaultDocumentNodeResolver = (S) =>
  S.document().views([S.view.form(), S.view.component(JsonPreview).title('Preview')])
