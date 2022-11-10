CREATE TABLE developers(
id INT,
login TEXT,
html_url TEXT,
type TEXT,
PRIMARY KEY (id)
);

CREATE TABLE repositories (
id INT PRIMARY KEY,
full_name TEXT,
distinct_releases INT,
releases_mean_time INT,
releases_median_time INT,
first_release_date TEXT,
last_release_date TEXT,
total_time_days INT,
contributors INT,
size INT,
watchers_count INT,
stargazers_count INT,
description TEXT,
url TEXT,
name TEXT,
language TEXT,
forks_count INT,
open_issues_count INT,
created_at DATETIME,
pushed_at DATETIME,
owner_id INT,
FOREIGN KEY (owner_id) REFERENCES developers(id)
);


CREATE TABLE issues(
id INT PRIMARY KEY,
body TEXT,
closed_at DATETIME,
comments INT,
created_at DATETIME,
labels TEXT,
milestone TEXT,
number INT,
state TEXT,
title TEXT,
url TEXT,
repo_id INT,
user_id INT,
FOREIGN KEY (repo_id) REFERENCES repositories(id),
FOREIGN KEY (user_id) REFERENCES developers(id)
);



CREATE TABLE releases (
id INT PRIMARY KEY,
created_at DATETIME,
published_at DATETIME,
name TEXT,
body TEXT,
author_id INT,
author_login TEXT,
url TEXT,
html_url TEXT,
tag_name TEXT,
draft TEXT,
prerelease TEXT,
repo_id INT,
FOREIGN KEY (repo_id) REFERENCES repositories(id),
FOREIGN KEY (author_id) REFERENCES developers(id)
)
