import { useState, useId } from "#imports";

const useFileupload = ({ id = '', onFileLoaded = (v) => v, multiple = false, accept = [] } = {}) => {

    const uid = id || useId();

    const modelValue = useState(`file-upload-${uid}`, () => null)

    const inputRef = useState(`file-upload-input-ref-${uid}`, () => null)
    const input = {
        bind: {
            ref: (el) => {
                inputRef.value = el;
            },
        },
        on: {
            change: (el) => {
                onFileLoaded(inputRef.value.files)
                modelValue.value = inputRef.value.files
            },
        },
    };

    const loadFile = () => {
        let input = document.createElement('input')

        input.type = 'file'
        input.multiple = multiple
        input.accept = accept.join()

        input.addEventListener('change', (e) => {
            onFileLoaded(input.files)

            modelValue.value = input.files

            input = null
        })

        input.click()
    }

    return {
        modelValue,
        loadFile,
        input
    }
}

export default useFileupload