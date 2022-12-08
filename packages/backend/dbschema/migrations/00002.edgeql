CREATE MIGRATION m1wwv3yepicvicyyvlfkssileenqfodhecelvkbjprlqqapcg6j6xa
    ONTO m13gdimnpu4tt3suz54q7lxczysnrsed6tv5tizlsvumtucw6lqy7a
{
  ALTER TYPE default::Url {
      ALTER PROPERTY url {
          DROP CONSTRAINT std::regexp(r'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)');
      };
  };
};
