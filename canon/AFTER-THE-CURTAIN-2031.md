# After the curtain
## Natural Intelligence, viewed from September 2031

**Status: an imagined destination and a proposed design, not a forecast or a shipped capability.**

Written in response to V's request to follow the Snake at least five years forward, then return and find what the present work needs. Current implementation reviewed at `7207ed586ea65cd271e1ab215cf6ed8d11fc9164`. This document changes no runtime, story source, license, or algorithm.

> A world can learn to meet another world without first becoming its owner.

## 1. A day in the world that follows

In September 2031, a person opens a work made with Natural Intelligence. They do not begin with an account, a personality assessment, or a wallet connection. There is a thread. It offers a few turns. They take three and leave the fourth unanswered.

The play begins from the thread they actually made. When Builder encounters an opening, it is the opening this person left. When Snake returns, it returns along their road. Nothing tells them what kind of person those turns reveal. The artwork is responsive without pretending to have diagnosed its visitor.

At the end, the names arrive. Some name the source story. Some name an older tradition that the interpretation echoes. Some name the code that performed the work. One names the visitor, privately, as the contributor of this particular trajectory. No mythological resemblance is passed off as an ownership claim.

The visitor keeps a skin: a portable record of the experience, the version of the score that enacted it, the permitted contributions that shaped it, and the conditions under which another work may use it. They can also leave without keeping anything. Silence is not an agreement to publish.

Later, a music-making application asks to use the rhythm of that trajectory. The visitor permits a local transformation of its timing, but not publication of their responses. The new work can receive a deliberately disclosed rhythm without receiving the entire personal history. Its contribution trail points back only as far as the visitor allowed.

A workshop uses the same machinery to combine several people's contributions. Each contribution has a source, a permitted purpose, and a boundary. Two accounts disagree. The shared field retains the disagreement instead of inventing a harmony that nobody expressed. The group sees a proposed action, the evidence for it, the gaps, and whose authority would be needed to proceed.

At home, a repair service can receive a narrow, time-limited account of an appliance fault without receiving the household's unrelated memory. Its request is addressed to an appliance field, not to a limitless personal archive. In this imagined world, connected devices are not entitled to listen simply because they can.

The original company might no longer operate the exhibition server. A retained local skin and compatible runtime still permit the owner to encounter their work. A new provider can serve it without becoming its author.

This is the destination: data can participate in new work while the boundaries of its origin, use, and interpretation remain legible.

## 2. The three parts are one lifecycle

The opening choices, the seven-act play, and the Many Names should be three views of one developing experience:

**Encounter → transformation → recognition → continuation.**

The opening is where the visitor contributes a first difference. The play is where that difference meets a world. The credits are where the work turns over and shows how it came to be. Export is not merchandise after the ending; it is the possibility of carrying the experience into another encounter.

One `experienceId` should exist before the first optional turn and persist through the last credit. The same committed events drive stage geometry, permissible scene variation, and the local provenance view. No phase silently resets the visitor or invents a second history.

A simple causal example makes the integration visible. A visitor leaves one side open. Builder later tries to complete that exact opening. The Weaver must respect the visitor's actual choice. At the end, one visible seam is credited to that choice. It is not a personality score. It is a consequence that can be pointed to.

There remains one canonical lived history per performance. An intentional new telling gets a separate identity. Temporary rehearsals need not become a retained cloud of unrealized worlds. Provenance connections to other works describe actual dependencies, not alternate pasts attached to this one.

## 3. The seams in the current code

These are observations of the reviewed files, not a judgment against the artwork.

`src/living-script.js` already carries a cursor, a skin, explicit pause states, an invitation, and real ado_on readings. Its normal memory passage is selected by `cursor / score.length`. Most scene action labels ultimately use the same gathering path. The scene's meaning therefore does not yet consistently determine the actual operation or the evidence it reads. [P1]

`Weaver.takeText` fits a source before the performance. Asking a question calls the organism without eating the question. `skin.stitch` records an encounter separately. This is a useful distinction, but the accumulated skin does not currently feed a distinct experience field that shapes subsequent reads. The default complete score is inherited memory, not a demonstrated online-learning process. [P2]

`keepTheSkin` protects its internal array by copying values and bounding its length. That is useful in-process history isolation. It is not durable database storage, cross-device reconciliation, encryption, signature verification, or cryptographic tamper evidence. Exported JSON is not thereby impossible to edit. [P2]

The explicit invitation changes a later line and one weave's progress. A complete policy for how acceptance, waiting, and refusal constrain all later effects remains design work. The separate `rehearse` API avoids committing a stitch; the authored Mirror scene still goes through `next` and its normal committed event path. The distinction between recording that a rehearsal occurred and adopting its candidate result needs to become explicit in the event types. [P1]

The decision prelude and mythological credit sequence are proposals in the conversation, not integrations verified in this reviewed runtime. This document does not backdate them into a release.

The right response is to join the existing pieces through a common contract, not to replace ado_on with another illustrative algorithm.

## 4. What the story becomes in software

| Dramatic role | Proposed durable responsibility | What must remain distinct |
|---|---|---|
| Nothing / the space between | Unanswered, pending, or unavailable states with explicit reasons | A zero value, refusal, absence, failure, and missing data |
| Flame | Origin and contribution carried into derived work | Origin attribution and a claim of legal ownership |
| Water | Exact retained evidence and its provenance | A source event and someone's interpretation of it |
| Air | A bounded, versioned exchange between fields | An informative message and authority to execute |
| Carbon | Typed relations that connect available things | A useful link and permission to disclose either endpoint |
| Weaver | The adapter joining native memory, evidence, policy, and effects | A high match score and an authorized decision |
| Snake | The causally ordered lived trajectory | History and an endlessly retained set of possibilities |
| Skin | Portable, scoped experience with inspectable lineage | A drawing, an index, and the full source bytes |
| Builder | Structure, schemas, indexes, and constraints | Helpful structure and unaccountable control |
| Rota | Versions, time, lease expiry, and return | A repeating phase and elapsed experience |
| Advocate | A request for a specific authorized action | Invitation and compulsion |
| Mirror | A no-effect preview | Showing a possible result and committing that result |
| Witness / credits | Evidence receipts and attributed interpretations | Authenticity, accuracy, authorship, and ownership |

The names earn their place by doing this work. Internal modules should also expose plain technical terms so developers do not need initiation into the story to use the library.

**Wisdom, as a software design goal here, is retaining enough context to use knowledge without outrunning evidence or permission.** It is not a scalar score assigned to a person.

## 5. One encounter contract

The proposed public unit of computation is an **encounter**, with three linked records rather than one oversized record that pretends to solve everything.

### Experience

An experience records an identified event, its actual causal parents, who or what contributed, the frame in which data is represented, and references to available evidence. A private payload is separate from any public receipt. It distinguishes source facts, fictional score content, user interpretations, and computed results.

### Authority

Authority records an authenticated, scoped permission: issuer, recipient, resource, permitted action, purpose, expiry, delegation limits, current status, and any required approval. It is evaluated at the point of use. Authority is not inferred from a character's dialogue, a retrieved passage, a successful similarity score, or the existence of a source file.

A compact schema may borrow concepts from ODRL for describing use conditions, but a policy description needs a real enforcement point. A policy file is not an invisible force field around plaintext. [E2]

### Decision receipt

A receipt records the proposal, the evidence actually considered, unresolved contradictions, the relevant permission version, the actor who approved or declined, the operation/version used, and the observed outcome. Approval, attempt, success, and failure are different events.

The proposed lifecycle is:

```text
receiveWithinConsent
    → readAvailableEvidence
    → keepUnresolvedDifferences
    → rehearseWithoutEffects
    → awaitAuthorizedChoice
    → commitOnce
    → witnessActualOutcome
    → renderTheLineage
```

These are proposed contracts, not functions exported by the current release. Existing `Weaver`, `followTheMemory`, `rehearse`, and `keepTheSkin` should sit behind the relevant entrances.

For external effects, use idempotency keys and a durable effect outbox. A failed network call must not be recorded as a completed event. A retry must not produce a second purchase, publication, or device command. No claim of universal exactly-once delivery is required: represent uncertain outcomes and reconcile them.

For read-only work, no side effect may occur merely because a fictional character says to act. For sensitive data, authorization must apply before retrieval and again to the proposed disclosure, including any aggregated result.

## 6. How the organism contributes without being asked to impersonate the whole system

ADO's corpus-derived addresses, native matching, order qualification, and refusal remain the memory instrument. The source README explicitly distinguishes that memory from generalization. Its benchmark descriptions are inherited claims, not new measurements from this design pass. [P3]

A decision layer must additionally resolve exact records, dates, quantities, identity, source conflicts, and the current permission state. An account found in memory is evidence to inspect, not automatically a correct answer or an authorization grant.

Keep inherited story/source memory separate from session events. The next integration should first let explicit committed choices shape the deterministic experience state and subsequent cue selection. A separately authorized ingest adapter can later offer selected experience to an experience field. It must state whether it refits a source, appends indexed material, or performs genuine incremental learning. Do not call all three the same thing.

Do not assume all prior organism work lives in this one public snapshot. Before implementing an experience-ingest mechanism, retrieve the existing canonical implementations from V's research library. Reuse established pieces rather than restarting closed experiments. This backcast is not evidence that a new learning or compression method has been discovered.

A proposed aggregate decision should preserve disagreement where it matters. Agreement among correlated copies is not independent evidence. Repeated sources should remain linked to their common origin. Some decisions belong to one owner; others require several authorized parties. A harmonic majority cannot override an individual's consent.

## 7. Data that travels with the means to interpret it

A new transfer model does not require inventing a physical network. It can begin with a useful application-level packet: permitted content or references, the frame needed to interpret it, and a verifiable account of how it was produced.

The ado_on field derives addresses from its source and lens. A bare address from one fitted field must not be treated as a universal semantic coordinate in another. A portable exchange needs an engine/schema version and a frame identity, plus a compatible decoding context or explicit conversion. Local coordinates are not global content IDs. [P2, P3]

A content identifier can identify bytes; it does not supply their interpretation, rights, decryption key, or continued availability. [E3] A packet should therefore declare what can actually be reconstructed and what must be fetched or supplied separately.

An ordinary transfer can send exact bytes. A shared-memory transfer may send references plus missing pieces when the recipient already has a verified common frame. A compact organism representation should replace raw data only when the intended reconstruction or query contract has been demonstrated at a lower total cost, including dictionaries, indexes, metadata, and decoding. The current wiggle projection supplies no such compression claim.

The visible straight lines become the artistic expression of a narrow, usable interface. Complexity has a declared place to live inside the Weaver. It has not been claimed away.

## 8. Privacy, permission, memory, and the right to leave

The personal field should begin locally, with independent fields for different contexts rather than one permanently merged identity. A public creative identity need not reveal a household identity. A service should receive the minimum scoped result, not the entire source archive.

No account or wallet should be required to experience the play. The opening matrix is optional and has an accessible equivalent; it should not covertly collect psychological traits. Public sharing, recording, later training, and commercial reuse require separate choices where applicable. Clicking Yes in the fiction is not a grant of rights over the visitor's data.

Own, hold, author, control, and license are different relationships. A signature can authenticate a statement about a right without establishing that the signer actually possessed that right. W3C's verifiable-credential model similarly separates successful verification from the truth of the claims. [E4]

Cryptographic logs should be described as tamper-evident under stated trust assumptions. A locally rewritten log cannot be detected by an outsider without a trusted checkpoint, signature, or other retained reference. Immutability is not a reason to publish every personal detail forever.

Separate the minimal event receipt from sensitive payloads. Payloads require explicit retention and deletion policies; derived indexes and caches must participate. An old event can remain a historical fact while access to its private details ends. New corrections can point to old claims without silently replacing what was recorded. This is a proposed interpretation of the trace/meaning distinction, not a rewrite of the supplied law text. [P4]

Revocation should stop future permitted access at enforcing components. It cannot promise to erase plaintext someone already copied. Offline permissions need an explicit expiry or freshness policy; a disconnected device cannot be assumed to know a revocation it has not received. RFC 7009 is a useful existing model for revocation semantics, not a complete solution to offline capability distribution. [E5]

Lost devices and compromised keys are part of normal life, not exceptions to hide. Design key rotation, recovery, revocation of old devices, restore tests, and scoped backup permissions before claiming ownership is robust. The platform should not make personal agency depend on remembering a single unrecoverable secret.

## 9. The place of blockchain

A chain may witness a deliberately disclosed checkpoint, an explicit transfer, or a shared commitment where participants need an external ordering or settlement service. It should be replaceable behind an interface, and the local play should function without it.

Do not publish raw cues, private memories, relationship graphs, or unsalted hashes of guessable secrets. Even a receipt's timing and identifiers can reveal more than its author intended. IPFS also requires deliberate privacy design: public routing metadata and content addressing do not provide content confidentiality. [E6]

The artistic role is narrow:

**The chain witnesses that a mark was made. It does not decide what the mark means.**

Economic terms may accompany a granted use. They do not need to accompany every touch of the thread. The first application should not make token speculation a prerequisite for demonstrating useful computation.

## 10. How the many fields cooperate

Treat each field as its own boundary of custody and authority. Shared work is a negotiated exchange between fields. Local-first research offers relevant patterns for offline ownership and collaborative data; Keyhive specifically explores capabilities and encrypted local-first collaboration. These are candidates for engineering reuse, not evidence that integration with ADO already exists. [E7, E8]

One canonical lived history per work is compatible with many independent works and many replicas. A provenance graph can link real exchanges between them without storing fictional alternatives. Private interpretations can differ without changing the underlying event.

For the early shared version, prefer a clearly authorized sequencer per work. A network partition can produce provisional contributions, but it must not silently grant conflicting ownership, exceed a spending limit, or pretend two exclusive decisions both committed. Draft collaboration may merge automatically; authority-sensitive commitments require an explicit rule.

The interface needs distinguishable results: answered, unresolved, insufficient evidence, unavailable, denied, expired, paused, failed, and ended. These states should be readable by applications even when the artwork projects several of them as silence.

## 11. The credits are a provenance interface

The Many Names can reveal two kinds of ancestry without confusing them.

**Cultural ancestry** records a tradition, source, character, specific aspect, and the relation claimed: alias in a named text, artistic resemblance, contrast, or adaptation. Shiva, a Gnostic Demiurge, and the Builder should not be flattened into an automatic equivalence. This design adds no new historical identifications.

**Actual contribution** records who wrote, computed, selected, licensed, performed, or permitted a part of this specific work. It includes software and source versions and the scope of any visitor contribution. Private contributors may remain unnamed in a public presentation.

Both views can grow from a lineage model with different edge types. W3C PROV already provides a useful entity/activity/agent vocabulary for actual derivation. Cultural interpretation should be an attributed assertion alongside it, never forged as literal authorship. [E1]

The user should be able to turn the cloth, inspect an edge, and see why that name appears. The story can evoke a vast lineage without the database pretending that evocative resemblance is a documented fact.

## 12. What the Oracle comparison asks of us

Oracle Database already documents immutable and hash-chained blockchain tables. Thus the distinction cannot honestly be 'ordinary databases have rows, we have history.' The proposed contribution is the experience-centered contract that joins memory, purpose-bound authority, explicit uncertainty, transformations, and lineage across interfaces. [E9]

Keep mature storage underneath it. A conventional database can retain authoritative records, an organism can supply a relational memory view, and the stage can make their operation encounterable. A new way of using computation need not replace every layer at once.

The standard of success is behavioral. Water must actually preserve the relevant evidence. Advocate must actually lack the power to force assent. Mirror must actually avoid external effects. Snake must actually resume from a valid portable history. Witness must actually expose provenance. Names alone are not an architecture.

The possible larger proposition is an **experience runtime**: reusable software through which an encounter can become a bounded memory and a permitted contribution to another encounter.

## 13. Walk backward from 2031

These dates are design horizons, conditional on the preceding evidence. They are not a promise of scale, market adoption, or future research outcomes.

**September 2031: independent continuity.** A second developer's application can open a permitted skin, verify its declared origin, understand its frame, use an allowed portion, and retain contribution lineage without the originating company's server. A returning person finds their history without being required to reveal every context of their life.

**2030: operational trust.** Long-running installations have recovery, key rotation, permission expiry, revocation handling, deletion policies, bounded storage, migration support, and independently exercised failure paths. A public protocol/specification and its licensing are explicit. Commercial software terms and content rights remain separately governed.

**2029: useful work beyond theatre.** One ordinary application uses the same encounter contract for a bounded decision: for example, a creative licensing workflow or an appliance-service request. It has actual evidence, authorization, effects, and receipts. An optional external checkpoint service can be compared with a no-chain deployment.

**2028: a relationship between two fields.** Two independently held fields exchange a permitted contribution without merging all their private data. Tests include incompatible frames, stale permission, conflicting accounts, and attempted unauthorized reuse. No physical or informational boundary is assumed away.

**2027: a skin that travels.** A versioned export/import round trip preserves committed choices and resumes on a second device or renderer. A record can be interpreted differently without being silently rewritten. Local retention, ownership/custody, source attribution, and narrowly scoped reuse are represented plainly.

**2026: one continuous artwork.** The optional opening turns, the seven-act story, and the credits read and change one experience through explicitly mapped actions. The real organism remains the memory instrument. The work can show which user event caused a later difference.

## 14. The next piece to build, not another platform first

Build one vertical slice: **The Thread You Take Home.**

1. Let the visitor make a few optional turns. No identity collection or diagnostic interpretation. Write exactly the chosen events to one local experience.
2. Make at least one later scene use those actual turns. The meaningful change must be in the state or chosen operation, not only a caption.
3. At the end, render that same history as a small contribution trail beside the carefully sourced Many Names.
4. Export a versioned skin with its score/engine/frame identities and explicit local-use conditions. Import it in a separate minimal reader and recover the declared continuation state.
5. Let that second reader request one additional transformation. An allowed request succeeds; an out-of-scope request, a refusal, and an expired grant do not produce the effect. No real-world irreversible action is needed for this demonstration.

The first pass can stay on one machine. The separate reader establishes a software boundary without prematurely promising distributed trust. Encryption, keys, signed checkpoints, networking, and settlement become subsequent explicit increments rather than checkbox claims attached to a JSON file.

Before adding files, inspect the current implementations and V's library for existing event, consent, snapshot and replay components. Prefer one authoritative schema and generated projections to a directory of nearly identical ledgers.

Keep the black-and-white stage, the complete story, and the current native memory path. Separate the score, the experience, interpretations, and authority. Replace fractional-corpus cue selection with declared evidence/cue mapping where a scene needs a specific operation. Pin the script revision before fitting its inherited field. Explicitly select which committed material may enter an experience field.

## 15. Acceptance evidence

The minimum demonstration should establish the following, without relabeling these tests as proof of a new universal computing paradigm:

- The same initial state, versioned score, and recorded choices produce the same declared replay state. Nondeterministic engine or external outputs are recorded as inputs to replay, not silently regenerated.
- The first turn causes a visible later difference, and its event ID appears in the credits' contribution trail.
- A pause creates no synthetic assent or penalty. Decline remains effective for subsequent relevant actions. End is distinct from pause.
- Mirror can record that a preview occurred without adopting the candidate result or producing external effects.
- Export/import is semantically equivalent for the declared state, and available payloads have the claimed exact byte identities.
- A second reader rejects unknown schemas, frames, bad signatures when signatures are used, missing required evidence, and unauthorized requests. It does not guess a permissive interpretation.
- Existing engine-parity tests are preserved. New interface behavior is tested separately from any proposed algorithmic improvement.
- Per-event payloads, source snapshots, indexes, retained revisions, and temporary rehearsals have accounted storage costs. Exhaustion pauses safely instead of silently deleting the past.

A larger product would additionally need adversarial review for unauthorized instructions hidden in source material, replay attacks, colluding/correlated evidence, identity spoofing, decryption-key misuse, and metadata leakage. None of those are solved by making a line beautiful.

## 16. A final turn of the cloth

*The credits have ended. The thread has not disappeared.*

**V:** What happens to the world when I close it?

**WEAVER:** The part you have chosen to keep can travel with you.

**V:** Does it still belong to you?

**WEAVER:** I made a way for you to carry it. That is not the same as keeping hold.

*V takes the skin to another loom. Its keeper waits beside an empty place.*

**KEEPER:** May I make a rhythm from this turn?

**V:** This turn. Not the whole road.

*One thread crosses. The rest stays in V's hand.*

**KEEPER:** I can work with that.

*The new cloth begins where the old permission ends.*

## Source register

### Project sources actually inspected

**P1.** `src/living-script.js`, reviewed at `7207ed586ea65cd271e1ab215cf6ed8d11fc9164`:
https://github.com/AlphaDataOmega/the_play/blob/7207ed586ea65cd271e1ab215cf6ed8d11fc9164/src/living-script.js

**P2.** `src/the-weaver.js`, same revision:
https://github.com/AlphaDataOmega/the_play/blob/7207ed586ea65cd271e1ab215cf6ed8d11fc9164/src/the-weaver.js

**P3.** `AlphaDataOmega/ado_on/README.md`, fetched blob `8009b5f55d80bf3fe00ae2846acee16afa7cf222`. Also the already pinned organism source in this repository; no new algorithm experiments were run:
https://github.com/AlphaDataOmega/ado_on/blob/main/README.md

**P4.** Immutable Laws mirror, fetched blob `4bc395530a2676b70131f7e6336c10cd2e058d4e`:
https://github.com/AlphaDataOmega/surface/blob/main/ado.earth/gate/LAWS.txt

The user-supplied seven-part story, Thread/Weaver scenes, choice prelude, Many Names proposal, and one-canonical-history direction are the creative context of this conversation. This pass did not retrieve the complete early Goal One archive and makes no claim to have done so.

### External engineering references consulted

**E1.** W3C PROV Data Model, entity/activity/agent and derivation vocabulary:
https://www.w3.org/TR/prov-dm/

**E2.** W3C ODRL Information Model 2.2, permissions, prohibitions, duties and constraints:
https://www.w3.org/TR/odrl-model/

**E3.** IPFS content identifiers:
https://docs.ipfs.tech/concepts/content-addressing/

**E4.** W3C Verifiable Credentials Data Model 2.0, especially verification versus validation and privacy considerations:
https://www.w3.org/TR/vc-data-model-2.0/

**E5.** RFC 7009, OAuth 2.0 Token Revocation:
https://www.rfc-editor.org/info/rfc7009/

**E6.** IPFS privacy and encryption:
https://docs.ipfs.tech/concepts/privacy-and-encryption/

**E7.** Ink & Switch, Local-first software:
https://www.inkandswitch.com/essay/local-first/

**E8.** Ink & Switch, Keyhive project overview:
https://www.inkandswitch.com/project/keyhive/

**E9.** Oracle Database documentation, Managing Tables, immutable and blockchain tables:
https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/managing-tables.html

No external framework has been selected, installed, or represented as integrated by this document. No runtime tests were executed for this documentary change.
