---
# Name of the lifestream.
title: "Name of the Livestream"
meta_desc: "Search Description"

# A featured livestream will display first in the list.
featured: false

# If the livestream has concluded, set this to true.
pre_recorded: false

# If the video is part of the PulumiTV series. Setting this value to true will list the video in the "PulumiTV" section.
pulumi_tv: false

# The preview image will be shown on the list page.
preview_image: ""

# Livestreams with unlisted as true will not be shown on the livestream list
unlisted: false

# The layout of the landing page.
type: livestreams

# The url slug for the livestream landing page.
url_slug: "{{ .Name }}"

# The content of the hero section.
hero:
    # The title text in the hero. This also serves as the pages H1.
    title: ""
    # The image the appears on the right hand side of the hero.
    image: "/icons/containers.svg"

# Content for the left hand side section of the page.
main:
    # Livestream title.
    title: ""
    # the ID of the YouTube Live video. For example, "Tbl8XHR-1-o" (not the full url)
    youtube_id: ""
    # Sortable date. The datetime Hugo will use to sort the webinars in date order.
    sortable_date: 2020-02-05T10:00:00-07:00
    # Duration of the stream.
    duration: "1 hour"
    # Datetime of the stream.
    datetime: ""
    # Description of the stream.
    description: ""

    # The livestream hosts and guests
    presenters:
        - name: ""
          role: ""

# This section contains the transcript for a video. It is optional.
transcript: |
    Here is where you would put the transcript for a recorded video.

# The right hand side form section.
form:
    # GoToWebinar webinar key. This key allows us to register people for webinars via the
    # HubSpot form.
    gotowebinar_key: ""

    # HubSpot form id.
    hubspot_form_id: ""
---
