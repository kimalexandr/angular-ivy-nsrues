export interface UserI {
    email               :string;
    password            :string;
    returnSecureToken   :boolean;

    key?                :string;    // id in users
    id?                 :string;    // auth id 
    first_name?         :string;
    last_name?          :string;
    profile_name?       :string;
    profile_about?      :string;
    country_id?         :string;     // сторонний спрвочник стран/городов  ?
    city_id?            :string;     // сторонний спрвочник стран/городов  ?
    gender?             :string[];   // передалть в enum type  [male, female]
    auth_method?        :string[];   // передалть в enum type [fb, vk, google]
    account_type?       :string[];   // передалть в enum type [simple, business]
    isAdvertising?      :boolean;
    isAccaunt_included? :boolean;

    subscribedToMe?     :string[];   // array of users_id
    subscribingToSome?  :string[];   // array of users_id   
    added_quotes?       :number[];   // array of quotes_id
    favorite_quotes?    :number[];   // array of quotes_id

    blocked_authors?     :string[];   // array of users_id
    blocked_quoters?     :string[];   // array of users_id

    note_friends_activity?:boolean;
    note_new_themes?:boolean;
}


// ================= FireBase =================

export interface FbAuthResponse {
    idToken:    string;
    expiresIn:  string;
    localId?:   string;
}

export interface FbCreateResponseI {
    name:       string;
}

// ============================================
// abridged version of UserI
export interface AuthorI {
    id:         number;
    name:       string;
    value?:     string;
    img?:       string;
}

export interface QuoteI {
    id:             number | string;
    quote_text?:    string 
    author_id?:     number | string;
    author_name?:   string;
    category_id?:   number;    // категория в которой на главной странице  (потом убрать)
    categoryes_id?:   string;  // все категории в которых состоит цитата
    create_data?:   number | Date | string;
    biography?:     string[];
    quote_links?:   string[]; 
}

export interface CommentI {
    id:             number | string;
    text?:          string; 
    quote_id:       number;  
    author_id?:     number | string;
    author_name?:   string;
    parent_id?:     number | string;
    create_data?:   number | Date | string;
}



export interface CardI {
    key:            number;
    type:           any;
    quote?:          QuoteI | null;
}

// ===================== common ==========================
export interface CountryI {
    id:            string;
    name:          string;
    iso?:          string | number;
}
