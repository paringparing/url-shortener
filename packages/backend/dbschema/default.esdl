module default {
  type User {
    required property userId -> str {
      constraint exclusive;
    }
    required property username -> str;
    required property admin -> bool {
      default := false;
    }
    multi link urls -> Url;
  }

  type Url {
    required property slug -> str {
      constraint exclusive;
    }
    required property url -> str;
  }
}
