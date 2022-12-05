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
    required property url -> str {
      constraint regexp(r'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)'); # https://stackoverflow.com/a/3809435
    }
  }
}
