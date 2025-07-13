# frozen_string_literal: true

class Post < ApplicationRecord
  enum :status, { draft: 0, published: 1 }
  has_and_belongs_to_many :categories
  belongs_to :organization
  belongs_to :user
  validates :title, presence: true, length: { maximum: 125 }
  validates :description, presence: true, length: { maximum: 10000 }
  validates_inclusion_of :is_bloggable, in: [true, false]
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug
  before_save :set_published_at, if: :publishing_now?

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_post_slug = Post.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_post_slug.present?
        slug_count = latest_post_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t("is immutable!"))
      end
    end

    def publishing_now?
      published? && published_at.blank?
    end

    def set_published_at
      self.published_at = Time.current
    end
end
