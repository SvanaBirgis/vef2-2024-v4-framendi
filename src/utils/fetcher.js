export const fetcher = async (url) => {
    return fetch(url)
      .then(async (res) => {
        return await res.json();
      });
  };