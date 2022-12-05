CREATE MIGRATION m13gdimnpu4tt3suz54q7lxczysnrsed6tv5tizlsvumtucw6lqy7a
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE TYPE default::Url {
      CREATE REQUIRED PROPERTY slug -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY url -> std::str {
          CREATE CONSTRAINT std::regexp(r'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)');
      };
  };
  CREATE TYPE default::User {
      CREATE MULTI LINK urls -> default::Url;
      CREATE REQUIRED PROPERTY admin -> std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY userId -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY username -> std::str;
  };
};
