export const fetchSingleUser = username => (
  $.ajax({
    url: `api/users/${username}`,
  })
);

// export const fetchAllLikedPostsForUser = user => (
//   $,ajax({
//     url: `api/users/${user.username}/likes`,
//   })
// )

export const updateSingleUserWithImage = (user, data) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.username}`,
    data: data,
    contentType: false,
    processData: false,
  });
};

export const updateSingleUser = user => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.username}`,
    data: { user },
  });
};