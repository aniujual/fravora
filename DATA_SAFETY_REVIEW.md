# Google Play Data Safety Review

Review date: October 19, 2026.

Based on the exported Data Safety responses and the upcoming app version's code. These are review recommendations, not confirmation that changes have been submitted in Play Console.

Your export confirms you already declare both approximate and precise location as collected and shared. Wikipedia does not introduce a new location category.

## Location Answers

Both location categories currently have:

| Answer | Current Value | Recommendation |
|---|---|---|
| Collected | Yes | Keep |
| Shared | Yes | Keep |
| User choice | Optional | Keep |
| Collection purpose | App functionality | Keep |
| Sharing purpose | App functionality | Keep |
| Processed ephemerally | **Yes** | **Reassess** |

The **ephemeral answer is the main release-related concern**. It requires the off-device processing to meet Google's memory-only, real-time retention criteria. The app code cannot establish whether Wikipedia or the Android geocoding provider retains coordinates in request logs.

Do not retain **Yes** merely because Fravora has no receiving server. Unless you can substantiate ephemeral handling across the relevant collection paths, **No is the defensible answer**. Local caching alone is not what determines this.

## Other Existing Mismatches

These are separate from replacing Nominatim:

| Current Declaration | What To Review |
|---|---|
| **Crash logs: required** | Change to **Optional** if collection is entirely controlled by the crash-report consent toggle and voluntary support reports. |
| **Diagnostics: required** | Likewise, use **Optional** if every collection path is user-controlled. |
| **App interactions: required** | If these are collected only through consent-based Analytics, change to **Optional**. |
| **Device IDs: advertising/marketing**, for both collection and sharing | This conflicts with the current no-ads policy. Remove those purposes if no covered app version or SDK still uses IDs for advertising or marketing. |
| **Device IDs: required** | Review all sources, including Analytics, Crashlytics, authentication and attestation. Do not automatically change this based only on analytics consent. |
| **Photos: collected, required** | Check the justification. Reading, downloading and caching photos on-device does not itself establish off-device collection. Do not remove it without checking all media-transfer paths. |

For device IDs, **shared also needs its own review** after removing any advertising use. Firebase processing may qualify for Google's service-provider exception, depending on the service and configuration.

## Support Reports

Your export does not select **Email address**, **Files and docs**, or **Other user-generated content**. Review these against support emails, filenames in attached logs, and submitted descriptions. The external-email handoff and user-initiated sharing exception need separate consideration; these are not automatically three mandatory additions.

If GPS-containing support attachments are reportable collection and retained in support emails, that also prevents precise-location collection from being described as entirely ephemeral.

## Deletion Link

The export still uses the old GitHub URL. Update it to the canonical address:

https://fravora.app/data-deletion.html

## Bottom Line

No new location checkbox is needed for Wikipedia. Prioritize the **ephemeral location answers**, then correct the **required analytics/crash declarations** and **advertising-related ID purposes** where the current behavior supports that.

These recommendations must cover the app versions still distributed through Google Play, not just the upcoming build.

## Official Guidance

- [Google Play Data Safety requirements, definitions and exceptions](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Android guidance on declaring app data use](https://developer.android.com/privacy-and-security/declare-data-use)