# Manyland Archives
This is the archives that will power [offlineland.io](https://offlineland.io)! The end goal is to have all of this be available on-demand via a CDN.


This archive will only host **public content**: things that one could find by walking around as an explorer, such as:
- the list of areas on Manyunity
- the list of areas in the sitemaps (that may appear in the random areas of the hour)
- the creations available in Universe Search
- players' public mifts and snapshots

There are a few things that will **not** be hosted here (at least for now) despite being "publicly accessible", because of the high likelihood that it would pull them out of their context and they were not meant to be archived forever; Most notably writables posts. See section [Responsible use](#responsible-use) for more on that.



## Some numbers
Here are some numbers on the amount of content in Manyland:
- 972'999'885 placements in the universe (source: insight boost)
- 6'399'272 "unique placed creations" (that is, the number of creations that have been placed at least once. source: insight boost)
- 634'038 creations in universe search
- 866'400 areas (source: insight boost)
- 261'015 public areas (from sitemaps / areas of the hour)
- 286'860 areas on ManyUnity
- 551'660 players (source: info-howmanypeople page)

So far, we have found and archived:
- 678'000'000 placements (69%)
- 4'900'000 unique placed creations (77%, but have more from the holders/motions/multis/clone history/etc, haven't diffed yet)
- 300'000 areas (33% of total, 100% of public areas)
- 30'000 subareas
- 240'000 players (43%)
- 183'500 snapshots
- 28'380 mifts

Note that most of the archival code isn't included yet! I'll upload the relevant data and code as I go through it, as long as it isn't too sensitive when aggregated (see the next section for more on that). If you are interested in specific data that isn't here, feel free to reach out on the #archive-effort channel on the [Anyland discord server](https://discord.gg/ahAs7U3)!

We're fairly confident to have archived everything that was public and relevant, and the archive process is mostly complete as of now (but will continue to run and archive new things until the game closes down). If you're seeing something missing, feel free to reach out too!



## Contributing
The reason why we've been so reluctant to open-source the work on Offlineland and are so careful about considering what is "too sensitive" to upload in the Manyland archive, is that Manyland has had a few rare but problematic and unrelenting people abusing any technical leverage they can with the only goal to make as loud as bang as possible, without much fore- or afterthought for the consequences.
The main "programming (script-kiddie) scene" on Manyland has a weird, shady, elitist/gatekeepy ("learn2code") and often toxic culture; ranging from trolling to crashing the game servers to doxxing.
Most of the technology-inclined people either fall into that culture to some extent, or make cool things but hush it up in order to avoid drawing unwanted attention or stigma.

However, seeing the results of the Anyland archival effort has been uplifting, and it'd be a shame for the Manyland side to not have an open-source legacy. We hope that the end of Manyland can be both a time for remembering the good times we had and the universe we've invented, but also a time for new growth, the start of new unique games and experiences infused with the spirit of Manyland.

### Rules and guidelines
Given the above and the potential sensitivity of the archived data, we've tried to set a few rules and guidelines for the projects surrounding Offlineland and our Manyland archival efforts in general.

The TLDR is:
- Be responsible and considerate, especially about: 
    - What is archived, and how is the data used (see section [Responsible use](#responsible-use))
    - How is the data archived (see section [Archiving data from manyland's servers](#archiving-data-from-manylands-servers))
- Be respectful (see the [Code of Conduct](./CODE_OF_CONDUCT.md))

And that's about it. If you want to contribute or plan to work on something related to archiving or as a legacy to Manyland, we strongly recommend you joining the #archive-effort channel on the [Anyland discord server](https://discord.gg/ahAs7U3)! Together with the Anyland folks, this is where we discuss the archival progress and building monuments to the games, and it allows us to get eachothers' opinion on whether or not something is a good idea.



### Responsible use
There is a balance to strike here between archiving what's public, making interesting data visualisations and building a dossier on everyone in an easily searchable format, so this section outlines guidelines for privacy and the ethics of building and using large datasets.


1. Define a goal

You may want to build a cool project or test a hypothesis through data analysis. It's important to know up-front what you want to do, or else you're simply data-hoarding.

"I want to build a board search" is not a well-defined goal, as it misses the final use cases. Consider the goal behind the goal, and consider how the project may be misused. E.g. someone may use the board search to pull up a player's posts from 10 years ago for the sake of stalking them.

"Because I can" is not a well-defined goal and doesn't impress anyone. We can all do anything. The weapons manufacturer has a responsibility regarding how the weapon is used.

"I want to see who swears the most" subverts privacy expectations (see "personal data" below)


2. Share your goal

Sharing your goal helps you get feedback from others! For example, there might be ethical considerations you haven't thought of that others could point out, or simply easier ways to achieve your goal. We can only benefit from transparency.

If you feel like you need to hide what you're doing for fear of judgement, ask yourself why what you're doing would be worthy of judgement.

3. Use the least amount of data necessary to achieve that goal

If you wanted to e.g. measure the most commonly spoken in-game language, you don't need the full text content tied to an user ID. Handle data responsibly: anonymize the data, and do not store data that you do not use.

#### Kinds of data

Data can be of various kind, depending on how it was produced and how it is made available. Care should be taken when collecting data and when building viewers/browsers to display and explore the data, as well as how it is stored or shared as raw datasets.

Data who's intent or context is lost or ambiguous should be treated as private by default.

##### Inferences

Inferences are second-order data derived from raw, primary data. For example, "the happiest in-game chat sentiment is between 8pm and 11pm" is an inference from chat logs.

Inferences don't necessarily inherit the kind of their primary data. Coalescing a large amount of data and anonymizing the data subjects can turn personal data into public data. Conversely, collecting and aggregating data about a single individual can turn public or personal data into private data.

##### Private data

Private data is data made without the explicit intention that it would be shared with the public. Private data should not be shared, let alone collected, without explicit consent of the data subjects associated with it. Subjects have the right to withdraw consent after they have given it, and request deletion. In other words: this is opt-in, not opt-out.

Examples:
- Private snapshots, Mifts, subareas
- Areas and creations marked as unlisted
- Non-clonable creations or skins
- Creations not intended to be easily findable
- Inferences from a specific user's data, such as:
	- Charlie's most used word in chat is 'like'
    - Alice is most often findable in area 6
	- Wallace's WPM is 400
	- Olive's online pattern is mostly around 9am UTC

##### Personal data

Personal data is public data with a certain expectation of ease of access or context-sensitiveness. It should not be taken outside of it's context, or made easier to access than it already is, without the consent of any data subjects associated with it.

Examples:
- Public chat (gone after a few seconds)
- Public board posts (buried after a few days)
- Subareas (accessed via interactings placed at specific spots, often with conditions (`is [EDITOR]`, `has BLUE KEY`, ...))

Examples of subverting privacy expectations (bad):
- Creating a board directory searchable by player or post content (note that this could be different if Manyland had eg. a built-in board search feature: the expectation of ease-of-access would be different)
- Performing player-specific analysis of any sort

##### Public data

Any information or creation intended to unambiguously be fully public. Inferences from public data should be anonymized, for example via aggregation.

Examples:
- Creations accessible through Universe Search
- Areas made public through ManyUnity
- Public received mifts



**TLDR**: Most of the time, aggregating data into "the bigger picture" while leaving the more potentially sensitive content is what makes it go from creepy to interesting or insightful. Not all data that can be shown or derived should be. It is also not enough for data to be "public" in some aspect to build visualisations or infer all sorts of data from it - the final result should align with the initial privacy intent, or receive explicit consent from the concerned party.



### Archiving data from manyland's servers
When you download data, please be mindful not to hammer the manyland servers. The CDNs are fine-ish (the urls with `.cloudfront.net`) since they are designed to send massive amount of cached/static data - though there is still a cost (especially on cache miss), so if the data is already available in the archive, try to skip over it.

On the other hand, any API call to manyland's servers (the `manyland.com/j/` urls) usually requires the server to process the request in sometimes complex ways, doing database queries etc; and this all can incur costs on Philipp's end or might even lead to the server crashing because of the load.

**TLDR**: Be civil, avoid re-downloading data that is already available, and throttle your requests by waiting around at least a second between each query (if the data you're querying is "heavy", try to wait more).

#### Archival infrastructure

Note that `tools/download-creation-data-cdn.ts` uses offlineland's caching/archival server (though you can obviously switch out the vars if you want to). It serves creations data from it's own database, and only if that's missing will it contact the Manyland servers (using the proper CDN sharding logic). This is designed to avoid straining Manyland's servers and getting cache misses from Cloudfront.

The cost on my end is minimal (this is the same server I'm hosting online.offlineland.io on), so you can hammer it as much as you'd like for your archival purposes (you might even want to paralellize the requests, because since it's one single server instead of a CDN the content isn't distributed globally - as in, there'll be a higher network latency. It supports HTTP/2). It will continue to be available after manyland shuts down and serve archived content (until I eventually forget about it and it dies a forgotten death in a few years).

Note that this server **will** save **any** id you send to it. For obvious privacy reasons, do **not** proxy off of it if the content is potentially private (eg. when exporting someone's creations) - use the real CDNs for that instead. Only use it when going through public content (from profiles, areas, holders, universe search, etc).

As an additional privacy measure, the only way to access that data (beyond the use as a cache layer in front of Manyland like in the tools here) will be through [https://online.offlineland.io](https://online.offlineland.io/) by the creations's creator if they linked their account (tldr: even if it received private data, only it's owner will be able to access it). Again, public data (universe search, etc) is intended to be released here.


The public archival server endpoints are:
- `GET https://archival.offlineland.io/creations/sprite/:creationId`
- `GET https://archival.offlineland.io/creations/def/:creationId`

It returns `404` on creations that don't exist. If you send it something that doesn't look like a mongoId, it'll reply with a `400` and a JSON body of `{ "error": "bad data" }` (regardless of your `Accept` header), so be mindful of the HTTP status code. It also sets the proper CORS headers so you can use it on any website.



### Data in this repository
The data here is mostly stored as `*.sqlite` databases, because SQLite is way better at storing a huge amount of small files. It takes about 450MB to store the entirety of universe search's data and sprites (about 630'000 creations), while if it was all written to disk it would take a handful of gigabytes!
SQLite also has support for both blobs and JSON, so it's perfect here.

For now, here's the schema:
```sql
CREATE TABLE sprites (id TEXT PRIMARY KEY, value BLOB );
CREATE TABLE defs (id TEXT PRIMARY KEY, value JSON);
CREATE TABLE errors_creations (id TEXT PRIMARY KEY, type TEXT, statusCode INTEGER);
CREATE TABLE bodymotions (id TEXT PRIMARY KEY, contents JSON);
CREATE TABLE holdercontents (id TEXT PRIMARY KEY, contents JSON);
CREATE TABLE multicontents (id TEXT PRIMARY KEY, contents JSON);
```

I have added helpers in `./tools/db.ts`, but since SQLite is so ubiquitous you can just take the SQL queries and re-use them into the language of your choice.
You can also use it straight from the CLI or other database viewer tools ([DBeaver](https://dbeaver.io/), [sqlitebrowser](https://sqlitebrowser.org/), etc):
```bash
$ sqlite3 databases/creations.sqlite 'SELECT * FROM defs WHERE value LIKE "%this feeling of wonder%";'
5c65d82e83b0152848df3b6a|{"base":"READABLE","creator":"51f6860bd71972b67b000004","id":"5c65d82e83b0152848df3b6a","name":"never forget","prop":{"textSize":23,"rgb2":"255,255,255","rgb":"0,0,0","textData":"this feeling of wonder!"}}
```

Git itself is not designed to store huge datesets like this, so for now the sqlite database file is available [here (1.1GB)](https://archival.offlineland.io/static/creations.sqlite). I'll commit it to the repo once the game closes down. (Github limits files to 100MB and the free tier only has 2GB of git-lfs storage space, so if I commit it now we'll need to rebase and force-push on each change, which is going to be a pain).

Snapshots weight about 9GB so they'll also be hosted off-repo. The database of placements weights 40GB, so I'll split it into smaller per-area files and compress them for the most popular areas. For the record, as a CSV (only placement data), area 3 weights about 400MB. As a zip from https://areabackup.com, it weights 4.8GB (offlineland.io probably can't handle this correctly, so we'll also need to figure out how to split it into smaller sections).


Following the guidelines outlined in [Responsible use](#responsible-use), snapshots taken in Created Areas have their areaId hashed, as they might have been taken in non-public areas. To find all snapshots in an area, first hash the areaId using sha1. PlayerIDs are also hashed the same way.


## Filtered creations
As this archive is automatically generated from an online game where players can upload their own content and where the main demographic is teenagers, please note that some of the content of the archives might be offensive, harmful or discriminatory and go against the Terms of Service.

While these creations are few and far between and most of them are simply a private joke between childrens who enjoy trash humor and being rebellious, I do not believe they have their place in this archive. We have done our best to get rid of most of it, but given the huge amount of content it is simply impossible for us to review it all. If you stumble upon this kind of unsavory user-generated content, please report it via Discord or email and we will purge it out.

### For devs: Filtering a creation
`lists/filtered-hashes.json` is a list of hashes of unsavory content are to be skipped over, with the help of code in `tools/filtering/`. For now this is just creation IDs and area names.

We use hashes to avoid having the raw value directly in the repository, and not for any kind of security. We keep the actual list off-repo.

To add a value to the list of hashes, run `bun run ./tools/filtering/add-filtered-values.ts theValue`. You can pass multiple arguments at once.

We will add an endpoint to archival.offlineland.io for reporting creations and areas soon. In your datavis, please consider adding a manyland-like "report this creation" button.


## Steam content
Steam content is saved in `archives/steam/community/`. SteamDB should also keep the game's data viewable even after it gets unlisted. See:
- Infos: https://steamdb.info/app/342280/info/
- Achievements: https://steamdb.info/app/342280/stats/
- Community Items: https://steamdb.info/app/342280/communityitems/
- Screenshots: https://steamdb.info/app/342280/screenshots/
- Steam store page: https://store.steampowered.com/app/342280 ([Wayback machine](https://web.archive.org/web/20230000000000*/https://store.steampowered.com/app/342280))
- Achievements page: https://steamcommunity.com/stats/342280/achievements ([Wayback machine](https://web.archive.org/web/20230000000000*/https://steamcommunity.com/stats/342280/achievements))


## See also
If you're interested to see the Anyland side of things, check [here](https://github.com/theneolanders/anyland-archive)!

