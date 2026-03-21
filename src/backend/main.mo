import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";



actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type ImageUpload = {
    filename : Text;
    timestamp : Time.Time;
    status : Text;
  };

  type PlatformStats = {
    totalAnalyses : Nat;
    accuracy : Float;
  };

  let contactSubmissions = List.empty<ContactSubmission>();
  let imageUploads = List.empty<ImageUpload>();
  let stats = Map.empty<Text, PlatformStats>();

  public shared ({ caller }) func addContactSubmission(name : Text, email : Text, message : Text) : async Bool {
    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(submission);
    true;
  };

  public shared ({ caller }) func addImageUpload(filename : Text, status : Text) : async Bool {
    let upload : ImageUpload = {
      filename;
      timestamp = Time.now();
      status;
    };
    imageUploads.add(upload);
    true;
  };

  public shared ({ caller }) func updateStats(totalAnalyses : Nat, accuracy : Float) : async Bool {
    let platformStats : PlatformStats = {
      totalAnalyses;
      accuracy;
    };
    stats.add("platform", platformStats);
    true;
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.toArray();
  };

  public query ({ caller }) func getImageUploads() : async [ImageUpload] {
    imageUploads.toArray();
  };

  public query ({ caller }) func getStats() : async ?PlatformStats {
    stats.get("platform");
  };

  public query ({ caller }) func getImageUploadByFilename(filename : Text) : async ?ImageUpload {
    imageUploads.values().find(func(upload) { upload.filename == filename });
  };
};
