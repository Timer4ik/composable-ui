import { computed, watch } from "#imports";

export default function usePagination(options) {
  const nextPage = () => {
    if (options.currentPage.value >= options.pageCount.value) {
      return;
    }
    options.currentPage.value++;
  };
  const prevPage = () => {
    if (options.currentPage.value <= 1) {
      return;
    }
    options.currentPage.value--;
  };
  const setPage = (page) => {
    if (options.currentPage.value < 1) {
      options.currentPage.value = 1;
      return;
    }
    if (options.currentPage.value > options.pageCount.value) {
      options.currentPage.value = options.pageCount.value;
      return;
    }
    options.currentPage.value = page;
  };

  const generateArrayOfPageLinks = () => {
    if (options.pageCount.value <= options.perView + 2) {
      return {
        isRight: false,
        isLeft: false,
        pageLinks: Array.from(
          { length: options.pageCount.value },
          (_, i) => (i = i + 1)
        ),
      };
    }

    let pageLinks = [];

    let start = 1;
    let end = options.pageCount.value;

    let isLeft = true;

    if (options.currentPage.value >= options.perView) {
      isLeft = false;
    }

    let isRight = true;

    if (
      options.currentPage.value <=
      options.pageCount.value - (options.perView - 1)
    ) {
      isRight = false;
    }

    if (!isRight && !isLeft) {
      pageLinks = Array.from(
        { length: options.perView - 2 },
        (_, i) =>
        (i =
          i +
          (options.currentPage.value - Math.floor((options.perView - 2) / 2)))
      );
      pageLinks.unshift(start, "...");
      pageLinks.push("...", end);
    } else if (isRight) {
      pageLinks = Array.from(
        { length: options.perView - 1 },
        (_, i) =>
          (i = i + 1 + (options.pageCount.value - (options.perView - 1)))
      );
      pageLinks.unshift(1, "...");
    } else if (isLeft) {
      pageLinks = Array.from(
        { length: options.perView - 1 },
        (_, i) => (i = i + 1)
      );
      pageLinks.push("...", options.pageCount.value);
    }

    return {
      isRight,
      isLeft,
      pageLinks,
    };
  };
  const paginator = computed(() => {
    if (options.pageCount.value <= options.perView + 2) {
      return {
        isRight: false,
        isLeft: false,
        pageLinks: Array.from(
          { length: options.pageCount.value },
          (_, i) => (i = i + 1)
        ),
      };
    }

    let pageLinks = [];

    let start = 1;
    let end = options.pageCount.value;

    let isLeft = true;

    if (options.currentPage.value >= options.perView) {
      isLeft = false;
    }

    let isRight = true;

    if (
      options.currentPage.value <=
      options.pageCount.value - (options.perView - 1)
    ) {
      isRight = false;
    }

    if (!isRight && !isLeft) {
      pageLinks = Array.from(
        { length: options.perView - 2 },
        (_, i) =>
        (i =
          i +
          (options.currentPage.value - Math.floor((options.perView - 2) / 2)))
      );
      pageLinks.unshift(start, "...");
      pageLinks.push("...", end);
    } else if (isRight) {
      pageLinks = Array.from(
        { length: options.perView - 1 },
        (_, i) =>
          (i = i + 1 + (options.pageCount.value - (options.perView - 1)))
      );
      pageLinks.unshift(1, "...");
    } else if (isLeft) {
      pageLinks = Array.from(
        { length: options.perView - 1 },
        (_, i) => (i = i + 1)
      );
      pageLinks.push("...", options.pageCount.value);
    }

    return {
      isRight,
      isLeft,
      pageLinks,
      generateArrayOfPageLinks,
    };
  });

  watch(
    () => options.pageCount.value,
    () => {
      if (options.currentPage.value < 1) {
        options.currentPage.value = 1;
        return;
      }
      if (options.currentPage.value > options.pageCount.value) {
        options.currentPage.value = options.pageCount.value;
        return;
      }
    },
    {
      flush: "sync",
    }
  );

  return {
    nextPage,
    prevPage,
    setPage,
    generateArrayOfPageLinks,
    paginator,
  };
}
