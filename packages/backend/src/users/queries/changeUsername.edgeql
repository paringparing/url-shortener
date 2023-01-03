select (
  update User filter .userId = <str>$id set {
    username := <str>$username
  }
) {
  userId,
  username,
  admin
}
