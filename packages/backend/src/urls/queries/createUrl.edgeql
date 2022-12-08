select (
  insert Url {
    slug := <str>$slug,
    url := <str>$url
  }
) {
  id,
  slug,
  url
}
