select (
  insert User {
    userId := <str>$userId,
    username := <str>$username
  }
) {
  userId,
  username,
  admin
}
