# frozen_string_literal: true

class Post < ApplicationRecord
  validates :title, presence: true, length: { maximum: 125 }
  validates :description, presence: true, length: { maximum: 10000 }
  validates_inclusion_of :is_bloggable, in: [true, false]
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug

  private

    def set_slug
      itr = 1
      loop do
        title_slug = title.parameterize
        slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
        break self.slug = slug_candidate unless Post.exists?(slug: slug_candidate)

        itr += 1
      end
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t("is immutable!"))
      end
    end
end
