function bindLoadingUi(el, binding) {
        if (binding.value) {
            el.classList.add("state-loading");
            el.setAttribute("disabled", "disabled");
        } else {

            el.classList.remove("state-loading");
            el.removeAttribute("disabled");
        }
}

export default bindLoadingUi;